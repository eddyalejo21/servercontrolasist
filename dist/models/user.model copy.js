"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var userSchema = new mongoose_1.Schema({
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
userSchema.method('compararPassw', function (passw) {
    if (passw === void 0) { passw = ''; }
    if (bcrypt_1.default.compareSync(passw, this.clave)) {
        return true;
    }
    else {
        return false;
    }
});
exports.User = mongoose_1.model('User', userSchema);
