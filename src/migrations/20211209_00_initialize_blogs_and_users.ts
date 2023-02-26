import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }:{context:any}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.createTable('blogs', {
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
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }:{context:any}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.dropTable('blogs')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await queryInterface.dropTable('users')
  },
}