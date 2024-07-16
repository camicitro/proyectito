import teamModel from "../models/TeamModel.js";

export default class TeamService {
    async findTeams(){
        try{
            const teams = await teamModel.find({ deletionDate: null })
            if(teams.length == 0 ) return [];
            return users
        }catch(error){
            throw new Error('Error buscando teams: ' + error.message);
        }
    }

    async findTeamById(teamId){
        try{
            const team = await teamModel.findOne({
                _id: teamId ,
                deletionDate: null 
            })
            if(!team) return null;
            return team
        }catch(error){
            throw new Error('Error buscando team: ' + error.message);
        }
    }

    async createTeam(teamData){
        try{
            const existingTeam = await teamModel.findOne({
                teamname: teamData.teamname,
                deletionDate: null
            })
            if(existingTeam) throw new Error('Ya existe ese team');
            const newTeam = new teamModel(teamData);
            await newTeam.save()
            return newTeam
        }catch(error){
            throw new Error('Error creando team: ' + error.message);
        }
    }

    async deleteTeam(teamId){
        try{
            const team = await this.findTeamById(teamId)
            
            if(!team) return false;
            team.deletionDate = new Date()
            await team.save()
            return true
        }catch(error){
            throw new Error('Error dando de baja team: ' + error.message);
        }
    }

    async updateTeam(teamId, teamData){
        try{
            const team = await this.findTeamById(teamId)

            if(!team){
                throw new Error('Team no encontrado')
            }
            Object.assign(team, teamData)
            await team.save()

            return team
        }catch(error){
            throw new Error('Error modificando team: ' + error.message);
        }
    }

    async findTeamByName(teamName){
        try{
            const team = await teamModel.findOne({
                teamname: teamName,
                deletionDate: null 
            })
            if(!team){
                return null
            }
            return team
        }catch(error){
            throw new Error('Error al encontrar team: ' + error.message);
        }
    }
}
