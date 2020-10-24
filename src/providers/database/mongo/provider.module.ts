import mongoose from "mongoose";
import mongoConfig from "@config/database/mongo/configuration";

export async function connectToMongoDB() {
  try {
    return await mongoose.connect(
      "mongodb://localhost:27017/mern-todo-app",
      mongoConfig
    );
  } catch (error) {
    return console.error(error);
  }
}
