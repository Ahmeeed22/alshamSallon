const { getAllCustomers, addCustomer, updateCustomer, deleteCustomer, searchCustomers } = require('../controller/customer.controller')
const isAuth = require('../../../common/middleare/isAuth')

const customersRoutes=require('express').Router()

customersRoutes.get('/allcustomers',isAuth('ALL'),getAllCustomers) 
customersRoutes.post('/addCustomer',isAuth('ALL'),addCustomer)
customersRoutes.put('/updateCustomer/:id',isAuth('ALL'),updateCustomer)
customersRoutes.delete('/deleteCustomer/:id',isAuth('ALL'),deleteCustomer)
customersRoutes.get('/searchCustomer',isAuth('ALL'),searchCustomers)

module.exports=customersRoutes;