import { DataType, DataTypes } from 'sequelize';
import db from "../database/conecction";

const Catalogs = db.define('CATALOG', {
    prodcatalog: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.DECIMAL(7,2),
    //    defaultValue:0
    },
    precioventantcatalog: {
        type: DataTypes.DECIMAL(7,2),
//   defaultValue:0
    },
    precioventaactcatalog: {
        type: DataTypes.DECIMAL(7,2),
    // defaultValue:0
    },
    estcatalog: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1

    }

})
export default Catalogs;