export class UserController {
    
    constructor(userService){
        this.userService = userService;
    }

    getAllUsers = async (req, res) => {
        try{

            const users = await this.userService.findUsers();
            
            if(users.length <= 0){
                return res.status(404).send({message: 'No se encontraron usuarios'})
            }
            res.status(200).json(users)
        } catch(error){
            //return res.status(500).json({ error: error.message})
            
            return res.status(500).send({message: 'Error en petición'})
        }
    }
    getUser = async (req, res) => {
        try{
            const userId = req.params.id
            const user = await this.userService.findUserById(userId)
            if(!user){
                return res.status(404).send({message: 'El usuario no fue encontrado'})
            }
            const {password: _, ...userWithoutPassword} = user.toObject()
            return res.status(200).json(userWithoutPassword) // ver q onda esto pq no deberiamos mandarle el user completo pq aca esta la password a la vista y otra info
        } catch (e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    createUser = async (req, res) => {
        try{
            const userData = req.body
            const newUser = await this.userService.createUser(userData)

            const {password: _, ...userWithoutPassword} = newUser.toObject()
            return res.status(201).json(userWithoutPassword) // ver q onda esto pq no deberiamos 
        }catch (e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    deleteUser = async (req, res) => {
        try{
            const userId = req.params.id
            const user = await this.userService.deleteUser(userId)
            if(!user){
                return res.status(404).send({message: 'El usuario no fue encontrado o ya está dado de baja'})
            }
            return res.status(200).send({ message: 'Usuario dado de baja exitosamente' });
        }catch (e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    updateUser = async (req, res) => {
        try{
            const userId = req.params.id
            const userData = req.body

            const updatedUser = await this.userService.updateUser(userId, userData)
            if(!updatedUser){
                return res.status(404).send({ message: 'Usuario no encontrado'})
            }
            return res.status(200).send({message: 'Usuario modificado exitosamente'})
        }catch(e){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    getUserWithTeam = async (req, res) => {
        try{
            const userId = req.params.id
            const user = await this.userService.findUserWithTeam(userId)
            if(!user){
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }
            const {password: _, ...userWithoutPassword} = user.toObject()
            return res.status(200).json(userWithoutPassword)
        } catch(e){
            return res.status(500).send({ message: 'Error en la peticion'})
        }
    }

    getUsersByTeamName = async (req, res) => {
        try{
            const teamName = req.params.teamName
            const users = await this.userService.findUsersByTeamName(teamName)
            if(!users.length){
                return res.status(404).json({ message: 'No se encontraron usuarios para el equipo ingresado '})
            }
            res.status(200).json(users)
        }catch(e){
            return res.status(500).send({ message: 'Error en la peticion'})
        }
    }

    updateTeamOfUser = async (req, res) => {
        try{
            const userId = req.params.teamName
            const team = req.body
            const user = await this.userService.assignTeamToUser(team._id, userId) // VER SI LE PASAMOS EL ID O EL NOMBRE!!!!!
            return user
        }catch(e){
            return res.status(500).send({ message: 'Error en la peticion'})
        }
    }
}