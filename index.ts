import { Server } from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user';
import asistRouter from './routes/asistencia';

const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

 server.app.use(cors({ origin:true , credentials:true }));

//Conectar a Mongo
mongoose.connect('mongodb://localhost:27017/biometrico',
    { useNewUrlParser: true, useCreateIndex: true 
    /*, user: 'epmmopDth', pass: 'epmmop.dth#'*/},
    (err) => {
        if (err) throw err;
        console.log('Mongo ONLINE');
    });

    //Rutas
server.app.use( '/user', userRouter );
server.app.use( '/asistencia', asistRouter);

// Levantar Servidor
server.start(() => {
    console.log(`Servidor corriendo, puerto ${server.port}`);
});

