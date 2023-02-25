import {DataTypes, Model } from 'sequelize';
import { sequelizeConnection as sequelize } from '../utils/db';

export default class Blog extends Model {
    public id?: number;
    public title!: string;
    public author!: string;
    public url?: string;
  }
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
    type: DataTypes.BOOLEAN
  },
  url: {
    type: DataTypes.BOOLEAN
  }
}, {
    sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});

