export const up = (queryInterface:any, Sequelize:any) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(30),
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
    },
    hashpass: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    created_date: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    created_by:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
        model: 'users',
        field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
    },
    deleted_date: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    deleted_by:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
        model: 'users',
        field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
    },
     modified_date: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    modified_by:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
        model: 'users',
        field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
    },
    delete:{
        default:0,
        allowNull:false,
        type:Sequelize.BOOLEAN
    }
  });
  
  export const down = (queryInterface:any) => queryInterface.dropTable('users');