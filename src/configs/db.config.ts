import mongoose from "mongoose";

import ENV from "./env.config";
import logger from "./logger.config";

/**
 * Connect to MongoDB using Mongoose
 */
const connectDB = async (): Promise<void> => {
	try {
		const uri = ENV.DB_URI;
		if (!uri) {
			throw new Error(
				"Please define the DB_URI environment variable inside your .env.<environment>.local file",
			);
		}
		await mongoose.connect(uri);
		logger.info(`✅ Connected to MongoDB`);
	} catch (error) {
		logger.error("❌ Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

// Optional: handle connection events (for debugging or logs)
mongoose.connection.on("disconnected", () => {
	logger.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
	logger.info("🔄 MongoDB reconnected");
});

export default connectDB;
