import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre Requerido']
    },
    email: {
        type: String
    },
    cedula: {
        type: String,
        unique: true,
        required: [true, 'Cedula Requerida']
    },
    clave: {
        type: String,
        required: [true, 'Clave Requerida']
    },
    cargo: {
        type: String
    },
    creado: {
        type: Date
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    estado: {
        type: String
    },
    usrMod: {
        type: String
    },
    modificado: {
        type: Date
    }
});

userSchema.method('compararPassw', function (passw: string = ''): boolean {
    if (bcrypt.compareSync(passw, this.clave)) {
        return true;
    } else {
        return false;
    }
});

interface IUser extends Document {

    nombre: string;
    email: string;
    cedula: string;
    clave: string;
    cargo: string;
    creado: Date;
    avatar: String;
    estado: String;
    usrMod: String;
    modificado: Date;
    compararPassw(password: string): boolean;
}
export const User = model<IUser>('User', userSchema);