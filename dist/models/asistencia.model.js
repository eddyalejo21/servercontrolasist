"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var asistenciaSchema = new mongoose_1.Schema({
    tipo: {
        type: String
    },
    fecha: {
        type: Date
    },
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    obs: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe exisitir relacion con el usuario']
    }
});
exports.Asistencia = mongoose_1.model('Asistencia', asistenciaSchema);
