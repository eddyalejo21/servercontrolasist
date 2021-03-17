import { Router, Request, Response, query } from "express";
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import Token from '../classes/token';
import { validateTk } from '../middleware/auth';
import path from 'path';
import fs from 'fs';

const userRouter = Router();

userRouter.post('/create', (req: Request, resp: Response) => {
    console.log('CREATE ',req.body);
    
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        cedula: req.body.cedula,
        cargo: req.body.cargo,
        creado: new Date(), 
        estado: 'A',
        avatar: req.body.avatar,
        usrMod: '',
        modificado: '',
        clave: bcrypt.hashSync(req.body.clave, 10)
    };
    // Persistir
    User.create(user).then(result => {
        resp.json({
            ok: true,
            token: Token.getJwtToken({
                _id: result._id,
                nombre: result.nombre,
                cedula: result.cedula ,
                avatar: result.avatar,
                estado: result.estado               
            })
        });
    })
    .catch(err => {
        resp.json({
            ok: false,
            err
        });
    });

});


//Servicio de Login
userRouter.post('/login', (req: Request, resp: Response) => {
    const body = req.body;

    User.findOne({ cedula: body.cedula, estado: 'A' }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return resp.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if (userDB.compararPassw(body.password)) {
            return resp.json({
                ok: true,
                token: Token.getJwtToken({
                    _id: userDB._id,
                nombre: userDB.nombre,
                cedula: userDB.cedula ,
                avatar: userDB.avatar ,
                estado: userDB.estado 
                })
            });
        } else {
            return resp.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

    });
});


//Validar
userRouter.get('/validate', validateTk, (req:any, res:Response)=>{
    res.json({
        ok:true,
        usuario : req.usuario
    });
});



userRouter.get('/cedula', (req: any, resp: Response) => {    
    User.findOne({ cedula: req.query.cedula }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return resp.json({
                ok: false
            });
        }else{
            console.log(userDB);
            
            return resp.json({
                ok: true
            });
        }
    });
});

userRouter.get('/findByCed', (req: any, resp: Response) => {    
    User.findOne({ cedula: req.query.cedula }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return resp.json({
                ok: false
            });
        }else{
            console.log(userDB);
            
            return resp.json({
                ok: true,
                user: userDB
            });
        }
    });
});


//Actualizar Usuario
userRouter.post('/update', validateTk, (req: any, resp: Response) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        avatar: req.body.avatar || req.usuario.avatar
    }

    User.findByIdAndUpdate(req.usuario._id, user, { new: true },
        (err, userDB) => {
            if (err) throw err;

            if (!userDB) {
                return resp.json({
                    ok: false,
                    mensaje: 'No existe usuario en la base'
                });
            }
            //GENERAR NUEVO TOKEN
            resp.json({
                ok: true,
                token: Token.getJwtToken({
                    _id: userDB._id,
                nombre: userDB.nombre,
                cedula: userDB.cedula ,
                avatar: userDB.avatar ,
                estado: userDB.estado 
                })
            });
        });
});


//Servicio para obtener imagenes
userRouter.get('/imagen', (req: any, res: Response) => {
    const name = req.query.name;    
    const pathFoto = path.resolve(__dirname, '../images/',name);
    if (fs.existsSync(pathFoto)){
        res.json({
            ok:true
        });
    }else{
        res.json({
            ok:false
        });
    }
   // res.sendFile( pathFoto); //enviar foto
});


//Actualizar Usuario
userRouter.post('/block', validateTk, (req: any, resp: Response) => {
    const user = {
        usrMod: req.body.usuario,
        modificado: new Date(),
        estado: 'H'
    }

    User.findByIdAndUpdate(req.usuario._id, user, { new: true },
        (err, userDB) => {
            if (err) throw err;

            if (!userDB) {
                return resp.json({
                    ok: false,
                    mensaje: 'No existe usuario en la base'
                });
            }
           
            resp.json({
                ok: true,
                mensaje: 'Usuario bloqueado'
            });
        });
});


//Actualizar Usuario
userRouter.post('/resetPssw', (req: any, resp: Response) => {    
    const user = {
        clave: bcrypt.hashSync(req.body.clave, 10)
    }

    User.findByIdAndUpdate(req.body._id, user, { new: true },
        (err, userDB) => {
            if (err) throw err;

            if (!userDB) {
                return resp.json({
                    ok: false,
                    mensaje: 'No existe usuario en la base'
                });
            }
            //GENERAR NUEVO TOKEN
            resp.json({
                ok: true,
                usr: userDB
            });
        });
});


export default userRouter;