"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = __importDefault(require("../classes/token"));
exports.validateTk = function (req, resp, next) {
    var userToken = req.get('h-token') || '';
    console.log('TOKEN', userToken);
    token_1.default.validateToken(userToken)
        .then(function (decoded) {
        req.usuario = decoded.usuario;
        next();
    })
        .catch(function (err) {
        resp.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
