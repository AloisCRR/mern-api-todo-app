import todoSchema from "@models/todos/schemas/todo.schema";
import userSchema, { ELang } from "@models/users/schemas/user.schema";
import { Types } from "mongoose";
import {
  ILanguageResult,
  ISentimentResult,
  IUserUpdates,
} from "./analyzeText.interface";
import textAnalyticsService from "./textAnalytics.service";

export default async function analyzeText() {
  try {
    const groups = await todoSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 1000 * 60 * 5),
          },
        },
      },
      {
        $group: {
          _id: "$user",
          texts: {
            $push: "$body",
          },
        },
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          text: {
            $reduce: {
              input: "$texts",
              initialValue: " ",
              in: {
                $concat: ["$$value", "$$this", " "],
              },
            },
          },
          _id: 0,
        },
      },
    ]);

    if (!groups.length) return;

    const [SentimentResults, LanguageResults] = (await Promise.all([
      textAnalyticsService.analyzeSentiment(groups),
      textAnalyticsService.detectLanguage(groups),
    ])) as [ISentimentResult[], ILanguageResult[]];

    console.log(SentimentResults);
    console.log(LanguageResults);

    const userUpdates: IUserUpdates = {};

    for (let { id, sentiment } of SentimentResults) {
      userUpdates[id] = { mood: sentiment };
    }

    for (const {
      primaryLanguage: { iso6391Name },
      id,
    } of LanguageResults) {
      const update = { ...userUpdates[id] };

      if (Object.values(ELang).includes(iso6391Name as ELang)) {
        update.lang = iso6391Name as ELang;
      }

      userUpdates[id] = update;
    }

    let bulk = userSchema.collection.initializeUnorderedBulkOp();

    let count = 0;

    for (const [id, update] of Object.entries(userUpdates)) {
      bulk.find({ _id: Types.ObjectId(id) }).updateOne({ $set: update });
      count = count + 1;
      if (count === 500) {
        await bulk.execute();
        count = 0;
        bulk = userSchema.collection.initializeUnorderedBulkOp();
      }
    }

    if (count > 0) {
      await bulk.execute();
    }

    console.log(`Analizador de texto corrió exitosamente`);
  } catch (error) {
    console.error(error);
  }
}
