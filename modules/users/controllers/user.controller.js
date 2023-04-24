const User = require("../model/user.model");
const {Op}=require("sequelize");
const Customer = require("../../customers/model/customer.model");
const bcrypt = require('bcrypt')
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const AppError = require("../../../helpers/AppError");
const { catchAsyncError } = require("../../../helpers/catchSync");
const LoggerService = require("../../../services/logger.service");

const logger=new LoggerService('user.controller')

// function  catchAsyncError(fun){
//     return (req,res,next)=>{
//         fun(req,res,next).catch(err=>{
//             next(err)
//             //res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'server error' , err,stack:err.stack})
//         })
//     }
// }


// get all users
const getAllUsers=catchAsyncError(async(req,res,next)=>{
    // try {
        const users=await  User.findAndCountAll({
            where:{company_id:req.loginData.company_id},
            include:Customer,
            attributes : {exclude : ['password']}
        });
        // logger.error('return  user list',users )
        res.status(StatusCodes.OK).json({message:"succes",users})
    // } catch (error) {
    //     next(new AppError('server Error',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }

}) 

// delete  user
const deleteUser=catchAsyncError(async(req,res,next)=>{
//    try{
        let id=req.params.id
        var userX=await User.findOne({where:{id}})
        if (userX)
            next(new AppError('this id not exist ',400))
        await User.destroy({
            where :{
                id
            },
        })
        res.status(StatusCodes.OK).json({message:"success"})
    // } catch (error) {
    //     next(new AppError('server Error',500))
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})



// update user
const updateUser=catchAsyncError(async(req,res,next)=>{
//    try {
        let id=req.params.id;
        let {name}=req.body;
        await User.update({name},{where:{id}})
        res.status(StatusCodes.OK).json({message:"success"})
//    } catch (error) {
//         next(new AppError('server Error',500))    
//     //  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    
//    }
})

// get single user
const getSingleUser=catchAsyncError(async(req,res,next)=>{
    // try {
        let id=req.params.id;
        let user=await User.findOne({where:{id}});
        res.status(StatusCodes.OK).json({message:"success",user});
//    } catch (error) {
//         next(new AppError('server Error',500))    
//     //  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
//    }
   
})
// search
const search=catchAsyncError(async(req,res,next)=>{
    // try{
        let {searchKey}=req.query;
        if(searchKey){
          let users= await User.findAll({where:{name:{[Op.like]: `%${searchKey}%`,company_id:req.loginData.company_id}}});
            res.status(StatusCodes.OK).json({message:"success",users})
        }else{
           let users= await User.findAll({});
           res.status(StatusCodes.OK).json({message:"success",users})
        }
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }

})
// add user
const addUser=catchAsyncError(async(req,res,next)=>{
    const {password} = req.body
    // try {
        const user= await  User.findOne({where:{email:req.body.email}});
        if (user) {
            res.status(StatusCodes.BAD_REQUEST).json({message:"email is exit"})
        } else {
            bcrypt.hash(password,7, async (err,hash)=>{
                if(err) throw err
                var result= await User.create({...req.body , password:hash})
                 res.status(StatusCodes.CREATED).json({message:"success",result})
            })
        }
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : 'error' , error})
    // }
})
// login
const login =catchAsyncError(async(req,res,next)=>{
    const {email , password} = req.body ;
    // try {
        console.log(email);
        const user= await User.findOne({where:{email : email}})
        if (user) {
           const match= await bcrypt.compare(password ,user.password);
           
           if (match) {
            var token =jwt.sign({email,id:user.id,name:user.name , role:user.role , company_id:user.company_id},'alsham2332',{expiresIn:'4h'}) ;
            var decode=jwt.decode(token ,'alsham2332')
            res.status(StatusCodes.OK).json({match,token,decode})

           } else {
            next(new AppError('password wrong',403))
            // res.status(StatusCodes.FORBIDDEN).json({message:"password wrong",match,user,passing:req.body})
           }

        } else {
            next(new AppError('email not found',400))
            // res.status(StatusCodes.BAD_REQUEST).json({message:"email not found"})
        }
    // } catch (error) {
    //     // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error",error})
    // }
})

module.exports={getAllUsers,deleteUser,addUser,updateUser,getSingleUser,search , login}