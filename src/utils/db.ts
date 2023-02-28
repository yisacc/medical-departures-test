import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';

export const sequelizeConnection = new Sequelize(DATABASE_URL,{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  }
}
)

export const connectToDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database',err);
    return process.exit(1);
  }

  return null;
};
