import express from 'express';
import { UserController } from '../controllers/UserController.js';
import userModel from '../models/UserModel.js';
import  UserService  from '../services/UserService.js';

const userRouter = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/users', userController.getAllUsers);

userRouter.get('/users/:id', userController.getUser);

userRouter.post('/users', userController.createUser);


export default userRouter