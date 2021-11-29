import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGO_URI as string;

export default async () => {
	if(!mongoURI) return;
    await mongoose.connect(mongoURI, {
        keepAlive: true
    });
};