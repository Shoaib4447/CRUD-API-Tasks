import mongoose from "mongoose";

const connectDDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected MongoDB");
  } catch (error) {
    console.log("Error while Connecting to MongoDB", error);
  }
};

export default connectDDB;
