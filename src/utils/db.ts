import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelizeConnection = new Sequelize(DATABASE_URL!);

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize:sequelizeConnection, tableName: 'migrations' }),
  context: sequelizeConnection.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const connectToDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    await runMigrations()
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database',err);
    return process.exit(1);
  }

  return null;
};
