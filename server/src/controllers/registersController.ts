import {Request, Response} from "express"
import Register, {IRegister} from "../models/registerModel"

export const allRegisters = async (req: Request, res: Response) => {
    const allRegister = await Register.find()
    return res.json(allRegister)
}

export const create = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const {fullName, companyName, email, phone, category, message} = req.body
    const newRegister: IRegister = new Register({
        fullName, companyName, email, phone, category, message
    })

    const registerSaved = await newRegister.save()

    return res.json(registerSaved)
}

export const deleteRegister = async (req: any, res: Response) => {
    let registerToDelete = req.registerId

    await Register.findByIdAndDelete(registerToDelete)

    return res.json({msg: "Register deleted"})
}

export const updateRegister = async (req: any, res: Response) => {
    let registerToUpdated = req.registerId
    const {fullName, companyName, email, phone, category, message} = req.body
    const registerUpdated = await Register.findByIdAndUpdate
    (registerToUpdated, {
        fullName, companyName, email, phone, category, message
    })

    return res.json({msg: "Register updated"})
}

export const registerById = async (req: any, res: Response, next: any, id: string) => {
    const idRegister = await Register.findById(id)
    req.registerId = idRegister
    next()
}


