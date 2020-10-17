import express from "express";

export async function main(): Promise<void> {
  const app = express();

  app.listen(3000, () => {
    console.log("Server running in port 3000");
  });
}
