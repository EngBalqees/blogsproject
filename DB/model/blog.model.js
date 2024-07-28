import { DataTypes } from "sequelize";
import { sequelize } from '../connection.js';
import UserModel from './user.model.js';

const BlogModel = sequelize.define('Blog',
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

BlogModel.belongsTo(UserModel);
UserModel.hasMany(BlogModel);

export default BlogModel;