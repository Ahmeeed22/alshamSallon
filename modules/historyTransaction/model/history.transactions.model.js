const { Sequelize } = require("sequelize");
const sequelize = require("../../../configrations/sequelize");


const HistoryTransactions =sequelize.define('historyTransaction',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    details:{
        type:Sequelize.STRING,
        allowNull: false 
    },
    active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

   


module.exports=HistoryTransactions ;