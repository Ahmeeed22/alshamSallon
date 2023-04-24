const isAuth = require('../../../common/middleare/isAuth')
const validationRequest = require('../../../common/middleare/validationRequest')
const { addcompany ,deletecompany ,getAllcompanys ,searchcompanys ,updatecompany} = require('../controller/company.controller')
const { addCompanySchema } = require('../joi/company.validation')

const companyRoutes=require('express').Router()

companyRoutes.get('/allcompanies',isAuth('ADMIN'),getAllcompanys)
companyRoutes.post('/addcompany',isAuth('ADMIN'),validationRequest(addCompanySchema),addcompany)
companyRoutes.put('/updatecompany/:id',isAuth('ADMIN'),validationRequest(addCompanySchema),updatecompany)
companyRoutes.delete('/deletecompany/:id',isAuth('ADMIN'),deletecompany)
companyRoutes.get('/searchcompany',isAuth('ADMIN'),searchcompanys)

module.exports=companyRoutes;