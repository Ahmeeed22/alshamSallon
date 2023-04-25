const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const TransactionAccount = require("../model/transactionAccounts.model");

const getAllTransactionAccount=catchAsyncError(async(req,res,next)=>{
        var TransactionAccount=await TransactionAccount.findAndCountAll()
        res.status(StatusCodes.OK).json({message:"success",result:TransactionAccount})
})

const addTransactionAccount=catchAsyncError(async (req,res,next)=>{
        var transactionAccount = await TransactionAccount.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:transactionAccount})
})

const updateTransactionAccount=catchAsyncError( async (req,res,next)=>{
        const id =req.params.id
        var x=await TransactionAccount.findOne({where:{id}})
        if (x)
            next(new AppError('this id not exist',400) )

        var TransactionAccount =await TransactionAccount.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:TransactionAccount})
})

const deleteTransactionAccount= catchAsyncError(async (req,res,next)=>{
        const id=req.params.id ;
        if (x)
        next(new AppError('this id not exist',400) )

        var TransactionAccount =await TransactionAccount.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:TransactionAccount})
})

// search
const searchTransactionAccount=catchAsyncError(async(req,res,next)=>{
            let {searchKey}=req.query;
            if(searchKey){
            let TransactionAccount= await TransactionAccount.findAll({where:{type:{[Op.like]: `%${searchKey}%`}}});
                res.status(StatusCodes.OK).json({message:"success",TransactionAccount})
            }else{
            let TransactionAccount= await TransactionAccount.findAll({});
            res.status(StatusCodes.OK).json({message:"success",TransactionAccount})
            }
})



module.exports={getAllTransactionAccount , addTransactionAccount , deleteTransactionAccount ,searchTransactionAccount , updateTransactionAccount}