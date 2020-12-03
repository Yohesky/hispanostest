import {Request, Response} from "express"
import User, {IUser} from "../models/usersModel"
import jwt from "jsonwebtoken"

function createToken(user: IUser){
    return jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET || "tokenaunxuser")
}

export const createUser = async (req: Request, res: Response) => {
    const {username, password} = req.body

    const userFounded = await User.findOne({username})
    if(userFounded){
        return res.status(400).json({msg: "this username already exists"})
    }

    const newUser = {username, password}

    const user: IUser = new User(newUser)

    user.password = await user.encryptPass(password)
    const savedUser = await user.save()
    return res.json({msg: "user created successfully"})
}

export const loginUser = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({msg: "All fields are required"})

    const user = await User.findOne({username})

    if(!user){
        return res.status(400).json({msg: "This username doesnt exists"})
    }

    const isMatch = await user.verifyPass(password)

    if(isMatch) return res.status(200).json({token: createToken(user), user})

    return res.status(400).json({msg: "Credenciales invalidas"})


}