const Service = require("../model/service.model");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const { Op , Sequelize} = require("sequelize");
const Transaction = require("../../transactions/model/transaction.model");

const getAllservices=catchAsyncError(async(req,res,next)=>{
    // try {
        var services=await Service.findAndCountAll({where :{active:true},order:[
            ['createdAt', 'DESC']
        ]})
        res.status(StatusCodes.OK).json({message:"success",result:services})
        
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const addService=catchAsyncError(async (req,res,next)=>{
    // try {
        var service = await Service.create(req.body);
        res.status(StatusCodes.CREATED).json({message:"success",result:service})
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})

const updateService= catchAsyncError(async (req,res,next)=>{
    // try {
        const id =req.params?.id
        var x= await Service.findOne({where:{id}})
        if (!x)
        next(new AppError('invalid id service',400))

        var service =await Service.update(req.body,{where:{id}})
        if (!service)
        next(new AppError("this id not valid",400))

        res.status(StatusCodes.OK).json({message:"success",result:service})
    // } catch (error) {
    //     next(new AppError('error server ',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
    
})

const deleteService= catchAsyncError(async (req,res,next)=>{
//    try {
        const id=req.params.id ;
        var x= await Service.findOne({where:{id}})
        if (!x)
        next(new AppError('invalid id service',400))

        var transaction = await Transaction.findOne({where:{service_id:id}})
        if (!transaction) {
            var service =await Service.destroy({
                where :{
                    id
                },
            })
            res.status(StatusCodes.OK).json({message:"success",result:service})
        } else {
            next(new AppError("failed delte this service type contains transactions must delete these are transactions  can you deactive this service",403))
            // res.status(StatusCodes.FORBIDDEN).json({message:"failed delte this service type contains transactions must delete these are transactions"})
        }
//    } catch (error) {
//     next(new AppError('error server ',500))    
//     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
//    }
})

// search
const searchservices=catchAsyncError(async(req,res,next)=>{
            let indexInputs=req.query;
            console.log( 'line 70',indexInputs);
            const filterObj = {
                where: {},
            }
                filterObj['order'] = [
                    [ 'createdAt',  'DESC'],
                ];
                if(indexInputs.name){
                    filterObj.where["name"] ={
                         [Op.like] :`%${indexInputs.name}%`
                    }   
                }
                if(indexInputs.active ==0 || indexInputs.active ==1){
                    filterObj.where["active"] =indexInputs.active
                }
            if(filterObj.where.name || filterObj.where.active== 0|| filterObj.where.active==1 ){
            let services= await Service.findAll({...filterObj});
                res.status(StatusCodes.OK).json({message:"success",services})
            }else{
            let services= await Service.findAll({order:[
                ['createdAt', 'DESC']
            ]});
            res.status(StatusCodes.OK).json({message:"success",services})
            }
    // } catch (error) {
    //     next(new AppError('error server ',500))    
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})



module.exports={getAllservices , addService , deleteService ,searchservices , updateService}