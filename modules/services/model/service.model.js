const { Sequelize } = require("sequelize");
const sequelize = require("../../../configrations/sequelize");

const Service =sequelize.define('service',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false ,
    },
    desc:{
        type:Sequelize.STRING,
        allowNull:true
    },
    active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

module.exports=Service ;