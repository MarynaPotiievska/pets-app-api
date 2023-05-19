const express = require('express')

const ctrl = require("../../controllers/pets");

const router = express.Router()

router.post('/', ctrl.addPet)

router.delete('/:petId', ctrl.removePet)

module.exports = router