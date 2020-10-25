import mongoose from "mongoose";
import { Db } from "mongodb";
import mongoConfig from "@config/database/mongo/configuration";
import agendaJobs from "jobs/agenda/agenda.job";

export async function connectToMongoDB() {
  try {
    const {
      connection: { db },
    } = await mongoose.connect(process.env.MONGO_URI as string, mongoConfig);

    agendaJobs(db as Db);

    return;
  } catch (error) {
    return console.error(error);
  }
}
