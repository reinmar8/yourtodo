import express from 'express';
import { addTodo, deleteAll, delTodo, doneTodo, getTodos } from '../controller/todoController.js';
import { isAuth } from '../utils.js';

export const todoRouter = express.Router();

todoRouter.post('/addtodo', isAuth, addTodo);
todoRouter.get('/gettodo', isAuth, getTodos);
todoRouter.delete('/all', isAuth, deleteAll)
todoRouter.delete('/:id', isAuth, delTodo);

todoRouter.put('/:id', isAuth, doneTodo);

