const express = require('express')

const router = express.Router()

const { getUsers, updateUser, deleteUser, getUser } = require('../controllers/user')
const { getPesans, addPesan, updatePesan, deletePesan, getPesan } = require('../controllers/pesan')
const { register, login } = require('../controllers/auth')
const { auth } = require('../middlewares/auth')

router.get('/user', getUsers)
router.get('/user/:username', auth, getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.get('/pesan', getPesans)
router.get('/pesan/:id', getPesan)
router.post('/pesan/:username', addPesan)
router.patch('/pesan/:id', updatePesan)
router.delete('/pesan/:id', deletePesan)

router.post('/register', register)
router.post('/login', login)

module.exports = router