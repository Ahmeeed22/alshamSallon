const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const HistoryTransactions = require("../model/history.transactions.model");

const getAllhistoryTransactions=catchAsyncError(async(req,res,next)=>{
        var historyTransactions=await HistoryTransactions.findAndCountAll()
        res.status(StatusCodes.OK).json({message:"success",result:historyTransactions})
})

const addHistoryTransactions=catchAsyncError(async (req,res,next)=>{
        var historyTransactions = await HistoryTransactions.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:historyTransactions})
})

const updatehistoryTransactions=catchAsyncError( async (req,res,next)=>{
        const id =req.params.id
        var x=await HistoryTransactions.findOne({where:{id}})
        if (x)
            next(new AppError('this id not exist',400) )

        var historyTransactions =await HistoryTransactions.update(req.body,{where:{id}})
        res.status(StatusCodes.OK).json({message:"success",result:historyTransactions})
})

const deletehistoryTransactions= catchAsyncError(async (req,res,next)=>{
        const id=req.params.id ;
        if (x)
        next(new AppError('this id not exist',400) )

        var historyTransactions =await HistoryTransactions.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success",result:historyTransactions})
})

// search
const searchhistoryTransactions=catchAsyncError(async(req,res,next)=>{
            let {searchKey}=req.query;
            if(searchKey){
            let historyTransactions= await HistoryTransactions.findAll({where:{details:{[Op.like]: `%${searchKey}%`}}});
                res.status(StatusCodes.OK).json({message:"success",historyTransactions})
            }else{
            let historyTransactions= await HistoryTransactions.findAll({});
            res.status(StatusCodes.OK).json({message:"success",historyTransactions})
            }
})



module.exports={getAllhistoryTransactions , addHistoryTransactions , deletehistoryTransactions ,searchhistoryTransactions , updatehistoryTransactions}