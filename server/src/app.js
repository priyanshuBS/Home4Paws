import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.route.js";
import petRouter from "./routes/pet.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pets", petRouter);

export default app;
