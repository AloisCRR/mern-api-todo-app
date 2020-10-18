import mongoose from "mongoose";

export function connect() {
  try {
    return mongoose.connect("mongodb://localhost:27017/mern-todo-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    return console.error(error);
  }
}
