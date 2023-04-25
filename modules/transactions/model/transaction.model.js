const { Sequelize } = require("sequelize");
const sequelize = require("../../../configrations/sequelize");


const Transaction =sequelize.define('transaction',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paymentAmount:{
        type:Sequelize.INTEGER,
        allowNull: false ,
        defaultValue:0
    },
    balanceDue:{
        type:Sequelize.INTEGER,
        allowNull: false ,
        defaultValue:0
    },
    price:{
        type:Sequelize.INTEGER
    }, 
    active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    sponsoredName : {
        type : Sequelize.STRING,
        allowNull:true 
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        // defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {   
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: false,
});

module.exports=Transaction ;