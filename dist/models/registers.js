"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var regSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre Requerido']
    },
    cedula: {
        type: String,
        unique: true,
        required: [true, 'Cedula Requerida']
    }
});
exports.Reg = mongoose_1.model('Reg', regSchema);
