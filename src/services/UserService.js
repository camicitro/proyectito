import userModel from "../models/UserModel.js";

export default class UserService {
    constructor(teamService){
        this.teamService = teamService
    }

    //GET TODOS LOS USUARIOS
    async findUsers (){
        try {
            const users = await userModel.find({ deletionDate: null }); //aca habria q ver si queermos q traiga todos o solo los q no estan dados de baja
            if(users.length === 0 ) return [];
            return users;
        }catch(error){
            throw new Error('Error buscando usuarios: ' + error.message);
        }
    }

    async findUserById(userId){
        try{
            const user = await userModel.findOne({
                _id: userId ,
                deletionDate: null 

            });
            if(!user){
                return null
            }
            return user
        }catch(error){
            throw new Error('Error buscando usuario: ' + error.message);
        }
    }

    async createUser(userData){
        try{
            //const username = userData
            const existingUser = await userModel.findOne({ 
                $or: [
                    { username : userData.username},
                    { email: userData.email}
                ],
                deletionDate: null
            });
            if(existingUser){
                throw new Error('Ya existe ese usuario ')
            }
            const newUser = new userModel(userData)
            await newUser.save()
            return newUser
        }catch(error){
            throw new Error('Error creando usuario: ' + error.message);
        }
    }

    async deleteUser(userId){
        try{
            const user = await userModel.findOne({
            _id: userId,
            deletionDate: null
            })
            if(!user){
                return false
            }
            user.deletionDate = new Date();
            await user.save();
            return true
        }catch(error){
            throw new Error('Error al dar de baja usuario: ' + error.message);
        }
    }

    async updateUser(userId, userData){
        try{
            const existingUser = await userModel.findOne({
                _id: {$ne: userId}, //para excluir al usuario actual
                $or:[
                    { username: userData.username },
                    { email: userData.email }
                ]
            })
            if(existingUser){
                throw new Error(' El nombre de usuario o mail ya están en uso ')
            }

            
            const user = await this.findUserById(userId)
            if(!user){
                throw new Error('User no encontrado')
            }

            Object.assign(user, userData)
            await user.save()

            return user
        }catch(error){
            throw new Error('Error modificando user: ' + error.message);
        }
    }

    async assignTeamToUser(teamId, userId){
        try{
            const user = await findUserById(userId)
            if(!user) throw new Error('Usuario no encontrado');
            const userUpdated = await userModel.findByIdAndUpdate(userId, {
                teamId: teamId
            }, { new: true });
            return userUpdated
        }catch(error){
            throw new Error('Error al asignar team al usuario: ' + error.message);
        }
    }

    async findUserWithTeam(userId){
        try{
            const user = await userModel.findOne({
                _id: userId ,
                deletionDate: null 

            }).populate('teamId')
            if(!user){
                return null
            }
            return user
        }catch(error){
            throw new Error('Error buscando usuario: ' + error.message);
        }
    }

    async findUsersByTeamName(teamName){
        try{
            const team = await this.teamService.findTeamByName(teamName)
            const users = await userModel.find({
                teamId: team._id
            }).populate('teamId').select('-password')
            if(users.length == 0) return [];
            return users
        }catch(error){
            throw new Error('Error buscando usuarios: ' + error.message);
        }
    }
}

