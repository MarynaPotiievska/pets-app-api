const express = require('express')

const ctrl = require("../../controllers/auth");

const router = express.Router()

router.post('/register', ctrl.register)

router.post('/login', ctrl.login)

router.put('/:userId', ctrl.updateUser)

router.post('/logout', ctrl.logout)

module.exports = router
