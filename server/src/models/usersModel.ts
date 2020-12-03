import {Schema, Document, model} from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new Schema({
    username: String,
    password: String,
    
})


UserSchema.methods.encryptPass = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

UserSchema.methods.verifyPass = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
}

export interface IUser extends Document {
    username: String,
    password: String,
    encryptPass(password: any): Promise<string>,
    verifyPass(password: string): Promise<Boolean>
}

export default model<IUser>("User", UserSchema)