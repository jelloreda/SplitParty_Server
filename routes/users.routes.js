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

    // res.json(user_id)
    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router