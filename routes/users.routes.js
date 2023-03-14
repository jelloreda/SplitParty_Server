const { verifyToken } = require("../middlewares/verifyToken")
const Event = require("../models/Event.model")
const User = require("../models/User.model")

const router = require("express").Router()

router.get('/getAllUsers', verifyToken, (req, res, next) => {

    const user = req.payload

    User
        .find({ _id: { $ne: user._id } })
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

router.get('/getFriendsAndEvents', verifyToken, (req, res, next) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate({
            path: 'friends',
            populate: {
                path: 'events',
            }
        })

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

router.put("/addEventToUser", (req, res, next) => {

    const { owner_id, event_id } = req.body

    User
        .findByIdAndUpdate(
            owner_id,
            { $addToSet: { events: event_id } },
            { new: true }
        )
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/addFriend", (req, res, next) => {

    const { owner_id, user_id } = req.body

    User
        .findByIdAndUpdate(
            owner_id,
            { $addToSet: { friends: user_id } },
            { new: true }
        )
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