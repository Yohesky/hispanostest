import {Schema, Document, model} from "mongoose"

const RegisterSchema = new Schema({
    fullName: String,
    companyName: String,
    email: String,
    phone: String,
    category: String,
    message: String
})

export interface IRegister extends Document {
    fullName: String,
    companyName: String,
    email: String,
    phone: String,
    category: String,
    message: String
}

export default model<IRegister>("Register", RegisterSchema)