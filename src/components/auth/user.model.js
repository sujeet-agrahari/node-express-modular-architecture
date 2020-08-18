
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    created_on: DataTypes.DATE,
    updated_on: DataTypes.DATE,
  }, {
    tableName: 'users',
  });
  return User;
};
