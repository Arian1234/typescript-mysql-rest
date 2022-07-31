import userRouter from '../routes/usuarios.route';
import catalogRouter from '../routes/catalogs.route'
import imageRouter from '../routes/images.route'
import cors from 'cors';
import express from 'express';
import db from '../database/conecction';

class Server {
    private app: express.Application;
    private port: string;
    private apiPatchs = {
        usuarios: '/api/usuarios',
        catalogs: '/api/catalogs',
        images: '/api/images',
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