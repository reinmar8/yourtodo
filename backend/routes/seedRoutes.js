import express from 'express';
import data from '../data.js';
import User from '../models/userModels.js';
import Todo from '../models/todoModels.js';

const seedRouter = express.Router();

seedRouter.get('/', async( req, res) => {
    // await User.remove({});
    // const createdUsers = await User.insertMany(data.users);
    // res.send({ createdUsers })
    await Todo.remove({});
});

export default seedRouter;