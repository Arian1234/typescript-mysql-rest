import { DataTypes } from "sequelize";
import db from '../database/conecction';

const Descriptions=db.define('DESCRIPTIONS',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
            },
titulodescrip:{
    type:DataTypes.STRING,
    defaultValue:'LOREM IPSUM'
}
});
export default Descriptions;