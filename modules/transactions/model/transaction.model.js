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
    }
});

module.exports=Transaction ;