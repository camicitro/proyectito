import userModel from "../models/UserModel.js";

export default class UserService {
    
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
            const username = userData
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
}

