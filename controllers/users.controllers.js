const User = require("../models/User.model")

const getAllUsers = (req, res, next) => {

    const user = req.payload

    User
        .find({ _id: { $ne: user._id } })
        .sort({ username: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => console.log(err))
}

const getOneUser = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getFriends = (req, res, next) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const editUser = (req, res, next) => {

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
}

const addEventToUser = (req, res, next) => {

    const { owner_id, event_id } = req.body

    User
        .findByIdAndUpdate(
            owner_id,
            { $addToSet: { events: event_id } },
            { new: true }
        )
        .then(response => res.json(response))
        .catch(err => next(err))
}

const addFriend = (req, res, next) => {

    const { owner_id, user_id } = req.body

    User
        .findByIdAndUpdate(
            owner_id,
            { $addToSet: { friends: user_id } },
            { new: true }
        )
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteFriend = (req, res, next) => {

    const { owner_id, user_id } = req.body

    User
        .findByIdAndUpdate(
            owner_id,
            { $pull: { friends: user_id } },
            { new: true }
        )
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllUsers,
    getOneUser,
    getFriends,
    editUser,
    addEventToUser,
    addFriend,
    deleteFriend,
    deleteUser
}