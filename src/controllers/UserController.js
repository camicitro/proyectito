export class UserController {
    
    constructor(userService){
        this.userService = userService;
    }

    getAllUsers = async (req, res) => {
        try{
            console.log("Entre al controlador")

            const users = await this.userService.getAllUsers();
            
            console.log("LLame y volvi del service, los users son: "+ users)
            
            if(users.length <= 0){
                return res.status(404).send({message: 'No se encontraron usuarios'})
            }
            res.status(200).json(users)
        } catch(error){
            return res.status(500).json({ error: error.message})
            
            //return res.status(500).send({message: 'Error en petición'})
        }
        
    }

}