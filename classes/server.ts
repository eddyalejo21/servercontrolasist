import { Application } from "express";
import express from 'express';

export class Server{
    public app: express.Application;
    public port : number= 3000;

    constructor(){
        this.app = express();
    }

    start( callback: () => void){
        this.app.listen ( this.port, callback );
    }
}