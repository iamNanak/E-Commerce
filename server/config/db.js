import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
    console.log(`MongoDB Connected 👍`);
  } catch (error) {
    console.error(`Error in connectDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
