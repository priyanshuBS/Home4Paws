import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

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
import userRouter from "./routes/user.routes.js";
import petRouter from "./routes/pet.routes.js";
import adoptionRouter from "./routes/adoption.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pets", petRouter);
app.use("/api/v1/adoption", adoptionRouter);

app.use(errorHandler);

export default app;
