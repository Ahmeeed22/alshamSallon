const isAuth = require('../../../common/middleare/isAuth')
const { addService,deleteService,getAllservices,searchservices,updateService} = require('../controller/service.controller')

const servicesRoutes=require('express').Router()

servicesRoutes.get('/allservices',isAuth('ALL'),getAllservices)
servicesRoutes.post('/addservice',isAuth('ALL'),addService)
servicesRoutes.put('/updateservice/:id',isAuth('ALL'),updateService)
servicesRoutes.delete('/deleteservice/:id',isAuth('ALL'),deleteService)
servicesRoutes.get('/searchservice',isAuth('ALL'),searchservices)

module.exports=servicesRoutes;