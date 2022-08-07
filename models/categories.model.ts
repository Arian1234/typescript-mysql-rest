import { DataTypes } from 'sequelize';
import db from '../database/conecction';
import sub_categories from './sub_categories.model';

const Categories=db.define('CATEGORIES',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    nombcategory:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
Categories.hasMany(sub_categories);
sub_categories.belongsTo(Categories);

export default Categories;