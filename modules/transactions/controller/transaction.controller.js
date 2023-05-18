const User = require("../../users/model/user.model");
const Customer = require("../../customers/model/customer.model");
const Service = require("../../services/model/service.model");
const Transaction = require("../model/transaction.model");
const { Op , Sequelize} = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const LoggerService = require("../../../services/logger.service");
const TransactionAccount = require("../../transactionAccount/model/transactionAccounts.model");

const logger=new LoggerService('transaction.controller')


const getAllTransactions=catchAsyncError(async(req,res,next)=>{
    const indexInputs =  req.body ;
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) { 
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    
    filterObj.where['company_id'] =req.loginData?.company_id ||1
    // if (indexInputs.orderBy) {
        filterObj['order'] = [
            [indexInputs?.orderBy?.coulmn|| 'createdAt', indexInputs?.orderBy?.type || 'DESC'],
        ];
    // }
    if(indexInputs.customer_id !=undefined){
        filterObj.where.customer_id = indexInputs.customer_id 
    }
    if(indexInputs.admin_id !=undefined){
        filterObj.where.admin_id = indexInputs.admin_id 
    }
    var startedDate=indexInputs.startedDate? new Date(indexInputs.startedDate) : new Date("2020-12-12 00:00:00");
    // date.setHours(date.getHours() + hours)
    let date=new Date(indexInputs.endDate)
    var  endDate=indexInputs.endDate? date.setHours(date.getHours() + 24) : new Date();
    if(indexInputs.startedDate || indexInputs.endDate){
        filterObj.where["createdAt"] ={
             [Op.between] : [startedDate , endDate]
        }   
    }
    if (indexInputs.active ==true ||indexInputs.active ==false ) {
        filterObj.where.active = indexInputs.active ;
    }
    if (indexInputs.balanceDue ) {
        filterObj.where.balanceDue = {[Op.gte] :indexInputs.balanceDue} ;
    }

    // try {
        console.log(filterObj.where);
        var transactions=await Transaction.findAndCountAll({
            ...filterObj
            ,include:[ {model:User,attributes: ['name', "id"]},
                        {model:Customer,attributes: ['name', "id"]},
                        {model:Service,attributes: ['name', "id","desc"]},
                    ]
        })
        var transactionsInfo=await Transaction.findAll({
          where: filterObj.where
            ,attributes: [ 
                [
                    Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'paymentAmount'
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('balanceDue')), 'balanceDue'
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('price')), 'price'
                ]
            ],
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactions,allProfite:transactionsInfo})
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const addTransaction=catchAsyncError(async (req,res,next)=>{ 
    // try{
     
        if ((req.body.paymentAmount + req.body.balanceDue) == (req.body.price)) {
            
            var transaction = await Transaction.create(req.body);

            res.status(StatusCodes.CREATED).json({message:"success",result:transaction })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
        }
        
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const updateTransaction= catchAsyncError(async (req,res,next)=>{
    // try{
        const id =req.params.id
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            next(new AppError("this id not valid",400))
            // res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 
            console.log(transaction.dataValues);
            console.log(req.body.paymentAmount + req.body.balanceDue);
            console.log(req.body.price);
            if ((req.body.paymentAmount + req.body.balanceDue) == (req.body.price)){

                var transactionUpdated =await Transaction.update(req.body,{where:{id}})
 
                res.status(StatusCodes.OK).json({message:"success",result:transactionUpdated })
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({message:"invalid data of payamount and balance"}) 
            }
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const deleteTransaction= catchAsyncError(async (req,res,next)=>{
//    try {
        const id=req.params.id ;
        var transaction =await Transaction.findOne({where:{id}})
        if (!transaction)
            next(new AppError("this id not valid",400))
            // res.status(StatusCodes.BAD_REQUEST).json({message:"this id not valid"}) 

        var transactioDeleted =await Transaction.update({active:false},{
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:transactioDeleted})
//    } catch (error) {
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
//    }
})

const getTransactionsSummary=catchAsyncError(async(req,res,next)=>{
    const indexInputs =  req.body ;
    const filterObj = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    const filterObjAccount = {
        where: {},
        limit: indexInputs.limit || 10,
    }
    if (indexInputs.offset) { 
        filterObj['offset'] = indexInputs.offset * filterObj.limit;
    }
    
    filterObj.where['company_id'] =req.loginData?.company_id ||1

    var startedDate=indexInputs.startedDate? new Date(indexInputs.startedDate) : new Date("2020-12-12 00:00:00");
    let date=new Date(indexInputs.endDate)
    var  endDate=indexInputs.endDate? date.setHours(date.getHours() + 24) : new Date();
    if(indexInputs.startedDate || indexInputs.endDate){
        filterObj.where["createdAt"] ={
             [Op.between] : [startedDate , endDate]
        }   
    }
    if (indexInputs.balanceDue ) {
        filterObj.where.balanceDue = {[Op.gte] :indexInputs.balanceDue} ;
    }

    // try {
        console.log(filterObj.where);
        var transactionsInfo=await Transaction.findAndCountAll({
          where: filterObj.where
            ,attributes: [ 
                [
                    Sequelize.fn('sum', Sequelize.col('paymentAmount')), 'paymentAmount'
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('balanceDue')), 'balanceDue'
                ],
                [
                    Sequelize.fn('sum', Sequelize.col('price')), 'price'
                ]
            ],
        })
        // console.log(transactionsInfo[0].dataValues.paymentAmount);
        var count = transactionsInfo?.count;
        var paymentAmount = transactionsInfo?.rows[0]?.dataValues?.paymentAmount;
        var balanceDue = transactionsInfo?.rows[0]?.dataValues?.balanceDue;
        var price = transactionsInfo?.rows[0]?.dataValues?.price;

        filterObjAccount.where={...filterObj.where,type:'supply'} 
        var transactionAccountSumSupply=await TransactionAccount.findAndCountAll({ 
            ...filterObjAccount  ,attributes: [ 
                
                [
                    Sequelize.fn('sum', Sequelize.col('amount')), 'sumSupply'
                ]
            ],
        })
        var sumSupply = transactionAccountSumSupply?.rows[0]?.dataValues?.sumSupply ||0;

        filterObjAccount.where={...filterObj.where,type:'expenses'} 
        var transactionAccountSumExpenses=await TransactionAccount.findAndCountAll({ 
            ...filterObjAccount  ,attributes: [ 
                
                [
                    Sequelize.fn('sum', Sequelize.col('amount')), 'sumExpenses'
                ]
            ],
        }) 
        var sumExpenses = transactionAccountSumExpenses?.rows[0]?.dataValues?.sumExpenses || 0;
        console.log("price ",price,"paymentAmount ",paymentAmount,"sumSupply ",sumSupply,"sumExpenses ",sumExpenses);
    
        var currentCash=paymentAmount-sumSupply-sumExpenses ;
        var profite =( price||0)-(sumExpenses||0) ;
        res.status(StatusCodes.OK).json({message:"success",summary:{sumExpenses,currentCash,profite,balanceDue,count,sumSupply , grossPrice:price ,transactionAccountSumExpenses,paymentAmount}})
})

module.exports={getAllTransactions , addTransaction , updateTransaction , deleteTransaction , getTransactionsSummary}
