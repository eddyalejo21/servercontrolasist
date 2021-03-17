import {Schema, Document, model} from 'mongoose';


const asistenciaSchema = new Schema({
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
    obs : {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe exisitir relacion con el usuario']
    }
});


interface IAsistencia extends Document {
    tipo: string;
    fecha: Date;
    latitud: number;
    longitud: number;
    obs: string;
    usuario: string;
}

export const Asistencia = model<IAsistencia>('Asistencia',asistenciaSchema);