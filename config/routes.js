const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const userControllers = require('../app/controllers/userControllers')
const authenticateUser = require('../app/middlewares/authenticateUser')
 
router.post('/users/register',userControllers.register)
router.post('/users/login',userControllers.login)
router.get('/users/account',authenticateUser,userControllers.account)
router.delete('/users/logout',authenticateUser,userControllers.logout)

router.get('/notes', authenticateUser,notesController.list)
router.get('/notes/:id',authenticateUser, notesController.show)
router.post('/notes',authenticateUser, notesController.create)
router.put('/notes/:id',authenticateUser, notesController.update)
router.delete('/notes/:id',authenticateUser, notesController.destroy)

router.get('/category',authenticateUser, categoriesController.list)
router.post('/category',authenticateUser, categoriesController.create)
router.get('/category/:id',authenticateUser, categoriesController.show)
router.put('/category/:id',authenticateUser, categoriesController.update)
router.delete('/category/:id',authenticateUser, categoriesController.destroy)

module.exports = router