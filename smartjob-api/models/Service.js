'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
      Service.hasOne(models.ServiceHistory, {
        foreignKey: 'serviceId',
        targetKey: 'id'
      })
      Service.belongsToMany(models.Category, {
        through: 'service_categories'
      })
      Service.belongsToMany(models.Tag, {
        through: 'service_tags'
      })
      Service.hasOne(models.address, {
        foreignKey:'serviceId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
    }
  }
  Service.init({
    title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expertLeve: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['beginner', 'intermediate', 'advance', 'expert']
      },
      yearsOfExperience: {
        allowNull:false,
        type: DataTypes.INTEGER
      },
      banners: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      video: {
        allowNull: true,
        type: DataTypes.STRING
      },
      serviceType: {
        type:DataTypes.ENUM,
        values: ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:DataTypes.ENUM,
        values: ['available','notavailable']
      },
      servicecharge: {
        type: DataTypes.RANGE(DataTypes.DOUBLE)
      },
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};