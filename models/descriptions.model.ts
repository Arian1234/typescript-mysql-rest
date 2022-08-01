import { DataTypes } from "sequelize";
import db from '../database/conecction';

const Descriptions=db.define('DESCRIPTIONS',{
titulodescrip:{
    type:DataTypes.STRING,
    defaultValue:'LOREM IPSUM'
}
});
export default Descriptions;