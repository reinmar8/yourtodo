import express from 'express';
import { userRegister, userSignIn } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/signin', userSignIn);
userRouter.post('/register', userRegister)


export default userRouter;