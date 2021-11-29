import mongoose from "mongoose";
import "dotenv/config";

const mongoPath = process.env.MONGO_URI as string;

export default async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true
    });
};