const isAuth = require('../../../common/middleare/isAuth')
const validationRequest = require('../../../common/middleare/validationRequest')
const {  getAllhistoryTransactions, addHistoryTransactions, deletehistoryTransactions, searchhistoryTransactions, updatehistoryTransactions} = require('../controller/history.transactions.controller')
const {addHistoryTransactionsSchema, updateHistoryTransactionsSchema } = require('../joi/history.transactions.validation')

const historyTransactionsRoutes=require('express').Router()

historyTransactionsRoutes.get('/getAllhistoryTransactions',isAuth('ADMIN'),getAllhistoryTransactions)
historyTransactionsRoutes.post('/addHistoryTransactions',isAuth('ADMIN'),validationRequest(addHistoryTransactionsSchema),addHistoryTransactions)
historyTransactionsRoutes.put('/updatehistoryTransactions/:id',isAuth('ADMIN'),validationRequest(updateHistoryTransactionsSchema),updatehistoryTransactions)
historyTransactionsRoutes.delete('/deletehistoryTransactions/:id',isAuth('ADMIN'),deletehistoryTransactions)
historyTransactionsRoutes.get('/searchhistoryTransactions',isAuth('ADMIN'),searchhistoryTransactions)

module.exports=historyTransactionsRoutes;