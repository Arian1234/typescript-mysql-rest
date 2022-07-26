"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_route_1 = __importDefault(require("../routes/usuarios.route"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.apiPatchs = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8800';
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado. ${this.port}`);
        });
    }
    routes() {
        this.app.use(this.apiPatchs.usuarios, usuarios_route_1.default);
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        //lectura del body
        this.app.use(express_1.default.json());
        //carpeta publica
        this.app.use(express_1.default.static('public'));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map