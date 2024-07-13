import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import mobileRouter from "./routes/mobile-routes";
import bookingsRouter from "./routes/booking-routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/mobile",mobileRouter);
app.use("/booking",bookingsRouter);


mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.mi8mrod.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(5000, () =>
            console.log("Connected To Database and Server is running")
        )
    )
    .catch((e) => console.log(e));
