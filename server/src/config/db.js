import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoInstance = await mongoose.connect(process.env.MONGODB_STRING);
    console.log(
      `MongoDB connected successfully!!! Connection host: ${mongoInstance.connection.host} `
    );
  } catch (error) {
    console.log("ERROR!! While connecting to MONGODB.", error);
  }
}

export default connectDB;
