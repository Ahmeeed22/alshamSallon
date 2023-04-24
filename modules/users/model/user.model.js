const sequelize = require("../../../configrations/sequelize");
const Sequelize=require("sequelize");
const Customer = require("../../customers/model/customer.model");
const Company = require("../../companies/model/company.model");
const User=sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    email: {
        type: Sequelize.STRING,
      },
    password: {
        type: Sequelize.STRING,
      },
      role : {
        type :Sequelize.INTEGER,
        defaultValue : 1
      },
      active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
})

// Hook before create user to hash password
User.beforeCreate(async (user, options) => {
  console.log("hoooooooooks " , user.email );   
});

// User.belongsTo(Company, {
//   foreignKey: 'company_id',
// });

module.exports=User;