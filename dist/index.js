"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./classes/server");
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./routes/user"));
var asistencia_1 = __importDefault(require("./routes/asistencia"));
var server = new server_1.Server();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Conectar a Mongo
mongoose_1.default.connect('mongodb://localhost:27017/biometrico', { useNewUrlParser: true, useCreateIndex: true
    /*, user: 'epmmopDth', pass: 'epmmop.dth#'*/ 
}, function (err) {
    if (err)
        throw err;
    console.log('Mongo ONLINE');
});
//Rutas
server.app.use('/user', user_1.default);
server.app.use('/asistencia', asistencia_1.default);
// Levantar Servidor
server.start(function () {
    console.log("Servidor corriendo, puerto " + server.port);
});
