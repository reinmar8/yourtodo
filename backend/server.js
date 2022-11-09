import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from 'cors'
import { todoRouter } from "./routes/todoRoutes.js";
import path from 'path';

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


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, rs) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
})