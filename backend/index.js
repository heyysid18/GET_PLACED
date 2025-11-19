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

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000","https://get-placed-1.onrender.com"],
  credentials: true,
};

app.use(cors(corsOptions));

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// simple health check route
app.get("/", (req, res) => {
  res.send("OK");
});

// use PORT from .env, otherwise fall back to 8001 to avoid conflicts on 8000
const port = parseInt(process.env.PORT, 10) || 8001;
const host = process.env.HOST || "0.0.0.0";

// connect to DB first, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, host, () => {
      console.log(`Server listening on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();