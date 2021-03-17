import { Router, Response, query } from 'express';
import { validateTk } from '../middleware/auth';
import { Asistencia } from '../models/asistencia.model';
import { User } from '../models/user.model';

import moment = require('moment');


const asistRouter = Router();

asistRouter.post('/',validateTk,(req: any, resp: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    User.findOne({ cedula: req.usuario.cedula, estado: 'A' }, (err, userDB) => {
        if(userDB){
            Asistencia.create(body)
                  .then( asistBDD => {
                      resp.json(
                          {
                              ok: true,
                              asistencia: asistBDD
                          }
                      );
                  })
                  .catch(err => {
                      resp.json(err)
                  });
        }else{
            resp.json({
                ok:false,
                mensaje: 'No tiene permisos'
            });
        }
    
    });
    
});

/*
asistRouter.get('/asistencias',validateTk, async (req: any, resp: Response) => {
    console.log('ASISTENCIAS ');
    const body = req.body;
    body.usuario = req.usuario._id;
    console.log('BODY ', body);
    
    //const fecha = req.query.fecha;
   const asistencias = await Asistencia.find({usuario: body.usuario, fecha: {$gte: new Date('2020-07-21')} } ,(err, userDB) => {
    if (err) throw err;
console.log(userDB);

    if (userDB){
        resp.json({
            ok: true,
            asistencias: userDB
        });
    }else{
        resp.json({
            ok: false
        });
    }
   }).exec();

               
});*/




export default asistRouter;