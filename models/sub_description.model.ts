import { DataTypes } from 'sequelize';
import db from '../database/conecction'
import Catalogs from './catalogs.model';
import Descriptions from './descriptions.model';
const Sub_descriptions=db.define('SUB_DESCRIPTIONS',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
            },
detalle_subdescrip:{
    type:DataTypes.STRING,
    defaultValue:'Sin detalles.'
},
url_subdescrip:{
    type:DataTypes.STRING,
    }
});

Catalogs.hasMany(Sub_descriptions);
Sub_descriptions.belongsTo(Catalogs);

Descriptions.hasMany(Sub_descriptions);
Sub_descriptions.belongsTo(Descriptions);

export default Sub_descriptions;