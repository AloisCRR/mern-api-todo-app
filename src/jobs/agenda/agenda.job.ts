import Agenda from "agenda";
import analyzeText from "jobs/azure/analyzeText.job";
import emptyTrash from "jobs/server/emptyTrash.job";
import moveToTrash from "jobs/server/moveTrash.job";
import { Db } from "mongodb";

export default async function agendaJobs(mongo: Db) {
  const agenda = new Agenda({
    db: {
      address: process.env.MONGO_URI,
      collection: "crons",
    },
    mongo,
    processEvery: "5 hours",
  });

  agenda.define("Analyze text", analyzeText);
  agenda.define("Move to trash", moveToTrash);
  agenda.define("Empty trash", emptyTrash);

  agenda.every("5 minutes", "Analyze text");
  agenda.every("1 day", "Move to trash");
  agenda.every("1 day", "Empty trash");

  await agenda.start();
}
