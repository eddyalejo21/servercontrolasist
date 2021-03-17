import { Response, NextFunction } from "express";
import Token from "../classes/token";

export const validateTk = (req: any, resp: Response, next: NextFunction) => {    
    let userToken = req.get('h-token') || '';
    console.log('TOKEN', userToken);
    
    Token.validateToken(userToken)
        .then( (decoded:any) =>{
            req.usuario = decoded.usuario;
            next();
        })
        .catch(err => {
            resp.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });
        });
};