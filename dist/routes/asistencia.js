"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var asistencia_model_1 = require("../models/asistencia.model");
var user_model_1 = require("../models/user.model");
var asistRouter = express_1.Router();
asistRouter.post('/', auth_1.validateTk, function (req, resp) {
    var body = req.body;
    body.usuario = req.usuario._id;
    user_model_1.User.findOne({ cedula: req.usuario.cedula, estado: 'A' }, function (err, userDB) {
        if (userDB) {
            asistencia_model_1.Asistencia.create(body)
                .then(function (asistBDD) {
                resp.json({
                    ok: true,
                    asistencia: asistBDD
                });
            })
                .catch(function (err) {
                resp.json(err);
            });
        }
        else {
            resp.json({
                ok: false,
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
exports.default = asistRouter;
