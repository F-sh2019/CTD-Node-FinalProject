const express = require('express')
const router = express.Router()
const { register, login  , getAllUsers , deleteUser} = require('../controllers/auth')
router.post('/register', register)
router.post('/login', login)
router.get('/getAllUsers', getAllUsers)
//router.delete('/deleteUser/:id' , deleteUser)
router.route('/deleteUser/:id').delete(deleteUser)
module.exports = router