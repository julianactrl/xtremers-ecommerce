const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('review', {
        rate:{
            type: DataTypes.INTEGER,
            allowNull: false,        
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
      
    });
  }