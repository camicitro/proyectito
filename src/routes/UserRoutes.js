import express from 'express';
import { UserController } from '../controllers/UserController.js';
import userModel from '../models/UserModel.js';
import  UserService  from '../services/UserService.js';
import TeamService from '../services/TeamService.js';

const userRouter = express.Router();

const teamService = new TeamService();

const userService = new UserService(teamService);
const userController = new UserController(userService);

userRouter.get('/users', userController.getAllUsers);

userRouter.get('/users/:id', userController.getUser);

userRouter.post('/users', userController.createUser);

userRouter.delete('/users/:id', userController.deleteUser);

userRouter.get('/users/team/:teamName', userController.getUsersByTeamName)

userRouter.put('/users/:id', userController.updateTeamOfUser)

userRouter.put('/users/modify/:id', userController.updateUser)


export default userRouter