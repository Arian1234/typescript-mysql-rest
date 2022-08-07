"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const conecction_1 = __importDefault(require("../database/conecction"));
const usuarios_route_1 = __importDefault(require("../routes/usuarios.route"));
const catalogs_route_1 = __importDefault(require("../routes/catalogs.route"));
const images_route_1 = __importDefault(require("../routes/images.route"));
const sub_descriptions_route_1 = __importDefault(require("../routes/sub_descriptions.route"));
const description_route_1 = __importDefault(require("../routes/description.route"));
const sub_categories_route_1 = __importDefault(require("../routes/sub_categories.route"));
const categories_route_1 = __importDefault(require("../routes/categories.route"));
const buscarCatalog_route_1 = __importDefault(require("../routes/buscarCatalog.route"));
class Server {
    constructor() {
        this.apiPatchs = {
            usuarios: '/api/usuarios',
            catalogs: '/api/catalogs',
            images: '/api/images',
            sub_descriptions: '/api/subs',
            descriptions: '/api/descriptions',
            sub_categories: '/api/subcategories',
            category: '/api/categories',
            buscarCatalog: '/api/buscar/catalog'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8800';
        this.dbconnection();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado... ${this.port}`);
        });
    }
    routes() {
        this.app.use(this.apiPatchs.usuarios, usuarios_route_1.default);
        this.app.use(this.apiPatchs.catalogs, catalogs_route_1.default);
        this.app.use(this.apiPatchs.images, images_route_1.default);
        this.app.use(this.apiPatchs.sub_descriptions, sub_descriptions_route_1.default);
        this.app.use(this.apiPatchs.descriptions, description_route_1.default);
        this.app.use(this.apiPatchs.sub_categories, sub_categories_route_1.default);
        this.app.use(this.apiPatchs.category, categories_route_1.default);
        this.app.use(this.apiPatchs.buscarCatalog, buscarCatalog_route_1.default);
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        //lectura del body
        this.app.use(express_1.default.json());
        //carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    dbconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conecction_1.default.authenticate();
                yield conecction_1.default.sync();
                console.log('database online...');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map