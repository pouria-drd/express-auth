import app from "./app";
import { ENV, logger } from "@/configs";
import connectDB from "./configs/db.config";

async function startServer() {
	try {
		const port = ENV.PORT;

		// Connect to MongoDB first
		await connectDB();

		// Start the server only after successful DB connection
		app.listen(port, () => {
			logger.info(`✅ Server running at: http://localhost:${port}`);
		});
	} catch (error) {
		logger.error("❌ Failed to start the server:", error);
		process.exit(1);
	}
}

startServer();
