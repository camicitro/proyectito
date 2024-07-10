import userModel from "../models/UserModel.js";

export default class UserService {
    
    //GET TODOS LOS USUARIOS
    async getAllUsers (){
        
        try {
            console.log("Entre al service")

            const users = await userModel.find();

            //console.log("busque usuarios: " , users)

            if(users.length === 0 ) return [];
            return users;
        }catch(error){
            throw new Error('Error getting users: ' + error.message);
        }
    }
}

