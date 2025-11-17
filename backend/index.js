import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

/**
 * Entrypoint that ensures the server binds to process.env.PORT and 0.0.0.0 (Render requirement).
 * If you already export an Express `app` from ./app, this will use it; otherwise it creates a minimal app.
 */
const createServer = () => {
	// Try to load an existing Express app (optional)
	try {
		// If you have backend/app.js or backend/app/index.js exporting an Express app, this will use it.
		const app = require('./app');
		return app;
	} catch (err) {
		// fallback: create minimal Express app
		const express = require('express');
		const app = express();
		app.get('/', (req, res) => res.send('OK'));
		return app;
	}
};

const app = createServer();

const port = parseInt(process.env.PORT, 10) || 8000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
	console.log(`Server listening on http://${host}:${port}`);
});

// graceful shutdown logs (optional)
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down');
	process.exit(0);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5174',
    credentials:true
}

app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);