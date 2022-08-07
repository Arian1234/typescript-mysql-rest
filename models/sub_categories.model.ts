import { DataTypes } from "sequelize";
import db from "../database/conecction";

const sub_categories = db.define('SUB_CATEGORIES', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombsubcategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destacado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }

});
export default sub_categories;