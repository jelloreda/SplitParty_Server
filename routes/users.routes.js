const { verifyToken } = require("../middlewares/verifyToken")
const User = require("../models/User.model")

const router = require("express").Router()

router.get('/getAllUsers', (req, res, next) => {

    User
        .find()
        .sort({ username: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => console.log(err))
})

router.get('/getOneUser/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.put("/editUser/:id", verifyToken, (req, res, next) => {

    const { id } = req.params
    const { username, email, avatar } = req.body

    const updatedUser = {}
    if (username) updatedUser.username = username
    if (email) updatedUser.email = email
    if (avatar) updatedUser.avatar = avatar

    User
        .findByIdAndUpdate(id, updatedUser, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/deleteUser/:id", verifyToken, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})



module.exports = router