'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    DEFAULT_SALT_ROUNDS = 10

    static associate(models) {
      // define association here
      User.hasMany(models.Job, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete:'CASCADE'
      })
      User.hasMany(models.Service, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete:'CASCADE'
      })
      User.belongsToMany(models.Contract, {through: 'contract_user'})
    }

    async matchPassword (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
  }
  User.init({
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.VARCHAR(22)
      },
      
  }, {
    hooks: {
        beforeCreate: async (user) =>{
            const encryptedPassword = await bcrypt.hash(
                user.password,
                DEFAULT_SALT_ROUNDS
              );
              user.password = encryptedPassword;
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};