import { UserService } from './../services/user_service';
import { Sequelize } from 'sequelize';
import { DATABASE_URL, saltRounds } from './config';
import bcrypt from 'bcrypt'

export const sequelizeConnection = new Sequelize(DATABASE_URL,{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  }
}
)
const seedAdminUser=async ()=>{
  console.log('add one admin user')
  const user={
    name:'admin user',
    username:'medicaldepartures',
    hashpass:bcrypt.hashSync('password', bcrypt.genSaltSync(saltRounds)),
    created_by:1,
    created_date:new Date().toUTCString()
  }
  const sql_query=`
  INSERT INTO users (
    name,
    username,
    hashpass,
    created_by,
    created_date
    ) VALUES ('${user.name}',
    '${user.username}',
    '${user.hashpass}',
    '${user.created_by}',
    '${user.created_date}')`
  await sequelizeConnection.query(sql_query)
}
export const connectToDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('connected to the database');
    const userService: UserService = new UserService({})
    if(! (await userService.getAllUsers()).data.length){
      await seedAdminUser()
    }
  } catch (err) {
    console.log('failed to connect to the database',err);
    return process.exit(1);
  }

  return null;
};
