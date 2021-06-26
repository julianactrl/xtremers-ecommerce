const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    order_email:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    order_date:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    order_adress:{
        type: DataTypes.TEXT,
        allowNull: true,

    },
    order_status:{
        type: DataTypes.ENUM("cart", 'created', 'cancelled', 'completed', 'processing'),
        allowNull: false,
    },
    total:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    mp_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_link: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        },
        allowNull: true,
    },
  });
  
}