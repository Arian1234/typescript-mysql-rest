import cors from 'cors';
import express from 'express';
import db from '../database/conecction';
import userRouter from '../routes/usuarios.route';
import catalogRouter from '../routes/catalogs.route';
import imageRouter from '../routes/images.route';
import subRouter from '../routes/sub_descriptions.route';
import descriptionRouter from '../routes/description.route';
import sub_categoryRouter from '../routes/sub_categories.route';
import categoryRouter from '../routes/categories.route';
import buscarcatalogRouter from '../routes/buscarCatalog.route';

class Server {
    private app: express.Application;
    private port: string;
    private apiPatchs = {
        usuarios: '/api/usuarios',
        catalogs: '/api/catalogs',
        images: '/api/images',
        sub_descriptions: '/api/subs',
        descriptions: '/api/descriptions',
        sub_categories: '/api/subcategories',
        category:'/api/categories',
        buscarCatalog:'/api/buscar/catalog'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8800';
        this.dbconnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado... ${this.port}`);
        })

    }

    routes() {
        this.app.use(this.apiPatchs.usuarios, userRouter);
        this.app.use(this.apiPatchs.catalogs, catalogRouter);
        this.app.use(this.apiPatchs.images, imageRouter);
        this.app.use(this.apiPatchs.sub_descriptions, subRouter);
        this.app.use(this.apiPatchs.descriptions,descriptionRouter);
        this.app.use(this.apiPatchs.sub_categories, sub_categoryRouter);
        this.app.use(this.apiPatchs.category, categoryRouter);
        this.app.use(this.apiPatchs.buscarCatalog, buscarcatalogRouter);
    }
    middlewares() {
        //Cors
        this.app.use(cors());
        //lectura del body
        this.app.use(express.json());
        //carpeta publica
        this.app.use(express.static('public'));
    }
    async dbconnection() {
        try {
            await db.authenticate();
            await db.sync();
            console.log('database online...');
        } catch (err) {
            console.log(err);
        }
    }
}
export default Server;