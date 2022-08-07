import { DataTypes } from 'sequelize';
import db from '../database/conecction';

const Usuario = db.define('USERS', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
            },
    nombreuser: {
        type: DataTypes.STRING
    },
    apellidouser: {
        type: DataTypes.STRING
    },
    documentouser: {
        type: DataTypes.STRING,
        unique:true
    },
    correouser: {
        type: DataTypes.STRING,
        unique:true
    },
    pwduser: {
        type: DataTypes.STRING
    },
    birthuser: {
        type: DataTypes.STRING
    },
    contactouser: {
        type: DataTypes.STRING,
        defaultValue:"???"
    },
    google:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    googleuser: {
        type: DataTypes.STRING,
      
    },
    imgurluser:{
        type:DataTypes.STRING,
        defaultValue:"https://www.imagesrandom.com.pe/kakashi.jpg"
    },
    estuser: {
        type: DataTypes.STRING,
        defaultValue:"1"
    }
})

export default Usuario;