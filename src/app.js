import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/Auth/Auth.routes.js";
import seatsRoutes from "./modules/Seat/seats.routes.js";
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user/", authRoutes);
app.use("/", seatsRoutes);

export { app };
