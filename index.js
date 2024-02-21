import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import userRouter from "./src/features/books/user.routes.js";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static('src/views'));
app.use("/api/hospitalAPI", userRouter);

export default app;