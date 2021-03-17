"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = require("../models/user.model");
var token_1 = __importDefault(require("../classes/token"));
var auth_1 = require("../middleware/auth");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var userRouter = express_1.Router();
userRouter.post('/create', function (req, resp) {
    console.log('CREATE ', req.body);
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        cedula: req.body.cedula,
        cargo: req.body.cargo,
        creado: new Date(),
        estado: 'A',
        avatar: req.body.avatar,
        usrMod: '',
        modificado: '',
        clave: bcrypt_1.default.hashSync(req.body.clave, 10)
    };
    // Persistir
    user_model_1.User.create(user).then(function (result) {
        resp.json({
            ok: true,
            token: token_1.default.getJwtToken({
                _id: result._id,
                nombre: result.nombre,
                cedula: result.cedula,
                avatar: result.avatar,
                estado: result.estado
            })
        });
    })
        .catch(function (err) {
        resp.json({
            ok: false,
            err: err
        });
    });
});
//Servicio de Login
userRouter.post('/login', function (req, resp) {
    var body = req.body;
    user_model_1.User.findOne({ cedula: body.cedula, estado: 'A' }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return resp.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassw(body.password)) {
            return resp.json({
                ok: true,
                token: token_1.default.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    cedula: userDB.cedula,
                    avatar: userDB.avatar,
                    estado: userDB.estado
                })
            });
        }
        else {
            return resp.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
    });
});
//Validar
userRouter.get('/validate', auth_1.validateTk, function (req, res) {
    res.json({
        ok: true,
        usuario: req.usuario
    });
});
userRouter.get('/cedula', function (req, resp) {
    user_model_1.User.findOne({ cedula: req.query.cedula }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return resp.json({
                ok: false
            });
        }
        else {
            console.log(userDB);
            return resp.json({
                ok: true
            });
        }
    });
});
userRouter.get('/findByCed', function (req, resp) {
    user_model_1.User.findOne({ cedula: req.query.cedula }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return resp.json({
                ok: false
            });
        }
        else {
            console.log(userDB);
            return resp.json({
                ok: true,
                user: userDB
            });
        }
    });
});
//Actualizar Usuario
userRouter.post('/update', auth_1.validateTk, function (req, resp) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        avatar: req.body.avatar || req.usuario.avatar
    };
    user_model_1.User.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return resp.json({
                ok: false,
                mensaje: 'No existe usuario en la base'
            });
        }
        //GENERAR NUEVO TOKEN
        resp.json({
            ok: true,
            token: token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                cedula: userDB.cedula,
                avatar: userDB.avatar,
                estado: userDB.estado
            })
        });
    });
});
//Servicio para obtener imagenes
userRouter.get('/imagen', function (req, res) {
    var name = req.query.name;
    var pathFoto = path_1.default.resolve(__dirname, '../images/', name);
    if (fs_1.default.existsSync(pathFoto)) {
        res.json({
            ok: true
        });
    }
    else {
        res.json({
            ok: false
        });
    }
    // res.sendFile( pathFoto); //enviar foto
});
//Actualizar Usuario
userRouter.post('/block', auth_1.validateTk, function (req, resp) {
    var user = {
        usrMod: req.body.usuario,
        modificado: new Date(),
        estado: 'H'
    };
    user_model_1.User.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
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
userRouter.post('/resetPssw', function (req, resp) {
    var user = {
        clave: bcrypt_1.default.hashSync(req.body.clave, 10)
    };
    user_model_1.User.findByIdAndUpdate(req.body._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
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
exports.default = userRouter;
