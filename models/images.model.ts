import {DataTypes} from "sequelize";
import db from "../database/conecction";
import Catalogs from './catalogs.model';

const Images=db.define('IMAGES',{
    urlimage:{
        type:DataTypes.STRING,
        defaultValue:"https://i.pinimg.com/736x/d0/3c/10/d03c10b4c41d6579cb4768e950cf645d.jpg"

    }
})

Catalogs.hasMany(Images);
Images.belongsTo(Catalogs);

export default Images;
