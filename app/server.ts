import { connectToDB } from "@/lib/mongoose";

async function startServer() {
  await connectToDB();

  // Start your server here
  console.log("Server ready after DB connection.");
}

startServer();
