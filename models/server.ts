
import userRouter from '../routes/usuarios.route';
import cors from 'cors';
import express from 'express';
class Server {
    private app: express.Application;
    private port: string;
    private apiPatchs = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8800';
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado. ${this.port}`);
        })

    }

    routes() {
        this.app.use(this.apiPatchs.usuarios, userRouter);
    }
    middlewares() {
        //Cors
        this.app.use(cors());
        //lectura del body
        this.app.use(express.json());
        //carpeta publica
        this.app.use(express.static('public'));
    }
}

export default Server;