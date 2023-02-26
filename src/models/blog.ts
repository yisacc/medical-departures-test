import {DataTypes, Model } from 'sequelize';
import { sequelizeConnection as sequelize } from '../utils/db';

export default class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.TEXT,
    allowNull:false
  },
  url: {
    type: DataTypes.TEXT,
  }
}, {
    sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});

