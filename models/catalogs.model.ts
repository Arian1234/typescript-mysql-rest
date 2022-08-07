import { DataType, DataTypes } from 'sequelize';
import db from "../database/conecction";
import sub_categories from './sub_categories.model';

const Catalogs = db.define('CATALOG', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
            },
    prodcatalog: {
        type: DataTypes.STRING,
        unique: true
    },
    descripcatalog: {
        type: DataTypes.STRING,
        defaultValue: '???'
    },
    skucatalog: {
        type: DataTypes.STRING,
    },
    cantcatalog: {
        type: DataTypes.INTEGER,
        // defaultValue: 0
    },
    preciocostcatalog: {
        type: DataTypes.DECIMAL(7, 2),
        //    defaultValue:0
    },
    precioventantcatalog: {
        type: DataTypes.DECIMAL(7, 2),
        //   defaultValue:0
    },
    precioventaactcatalog: {
        type: DataTypes.DECIMAL(7, 2),
        // defaultValue:0
    },
    estcatalog: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1

    }
})

sub_categories.hasMany(Catalogs);
Catalogs.belongsTo(sub_categories);

export default Catalogs;