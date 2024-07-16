export class TeamController{
    constructor(teamService){
        this.teamService = teamService;
    }

    getAllTeams = async (req, res) =>{
        try{
            const users = await this.teamService.findTeams()
            if(users.length == 0){
                return res.status(404).send({ message: 'No se encontraron teams' })
            }
            res.status(200).json(teams)
        }catch(error){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    getTeam = async (req, res) => {
        try{
            const teamId = req.params.id
            const team = await this.teamService.findTeamById(teamId)
            if(!team){
                return res.status(404).send({message: 'El team no fue encontrado'})
            }
        return res.status(200).json(team)
        }catch(error){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    createTeam = async (req, res) => {
        try{
            const teamData = req.body
            const newTeam = await this.teamService.createTeam(teamData)
            return res.status(201).json(newTeam) 

        }catch(e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    deleteTeam = async (req, res) => {
        try{
            const teamId = req.params.id
            const teamDeleted = await this.teamService.deleteTeam(teamId)
            if(!teamDeleted){
                return res.status(404).send({message: 'El team no fue encontrado o ya está dado de baja'})
            }
            return res.status(200).send({ message: 'Team dado de baja exitosamente' });
        }catch(e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    updateTeam = async (req, res) => {
        try{
            const teamId = req.params.id
            const teamData = req.body
            const updatedTeam = await this.teamService.updateTeam(teamId, teamData)
            if(!updatedTeam){
                return res.status(404).send({ message: 'Team no encontrado'})
            }
            return res.status(200).send({message: 'Team modificado exitosamente'})
        }catch(e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }
}

