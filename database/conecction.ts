import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const database:string=process.env.DB || 'db';
const user:string=process.env.USER || 'db';
const pass:string=process.env.PASS || 'db';
const db=new Sequelize(database,user,pass,{
    host:process.env.HOST,
    dialect:'mysql'
});

export default db;