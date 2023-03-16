const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken')

const {
    getOneUser,
    getFriends,
    getAllUsers,
    editUser,
    addEventToUser,
    addFriend,
    deleteFriend,
    deleteUser
} = require('../controllers/users.controllers')

router.get('/getAllUsers', verifyToken, getAllUsers)
router.get('/getOneUser/:id', getOneUser)
router.get('/getFriends', verifyToken, getFriends)
router.put('/editUser/:id', verifyToken, editUser)
router.put('/addEventToUser', addEventToUser)
router.put('/addFriend', addFriend)
router.put('/deleteFriend', deleteFriend)
router.delete('/deleteUser/:id', verifyToken, deleteUser)

module.exports = router