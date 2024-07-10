import userModel from "../models/UserModel.js";

export default class UserService {
    
    //GET TODOS LOS USUARIOS
    async findUsers (){
        try {
            const users = await userModel.find();
            if(users.length === 0 ) return [];
            return users;
        }catch(error){
            throw new Error('Error buscando usuarios: ' + error.message);
        }
    }

    async findUserById(userId){
        try{
            const user = await userModel.findById(userId)
            if(!user){
                throw new Error('Usuario no encontrado')
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
                ]
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
}

