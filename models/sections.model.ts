import {DataTypes} from "sequelize";
import db from "../database/conecction";

const Sections=db.define('SECTIONS',{
nombsection:{
    type:DataTypes.STRING,
    allowNull:false
}
});
export default Sections;