import express from 'express'
import { TeamController } from '../controllers/TeamController.js'
import TeamService from '../services/TeamService.js'

const teamRouter = express.Router()

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/teams', teamController.getAllTeams);

teamRouter.get('/teams/:id', teamController.getTeam);

teamRouter.post('/teams', teamController.createTeam);

teamRouter.delete('/teams/:id', teamController.deleteTeam);

teamRouter.put('/teams/:id', teamController.updateTeam)


export default teamRouter


