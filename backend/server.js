import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from 'cors'
import { todoRouter } from "./routes/todoRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch(err => {
        console.log(err.message);
    });

app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);


const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
})