const Event = require("../models/Event.model")

const router = require("express").Router()

router.get('/getAllEvents', (req, res, next) => {
    res.json('Los eventos')
})

router.post('/saveEvent', (req, res, next) => {

    const { name, date, description } = req.body

    Event
        .create({ name, date, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router