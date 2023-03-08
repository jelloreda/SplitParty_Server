const { verifyToken } = require("../middlewares/verifyToken")
const Event = require("../models/Event.model")

const router = require("express").Router()

router.get('/getAllEvents', (req, res, next) => {

    Event
        .find()
        .sort({ date: 1 })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.post('/saveEvent', verifyToken, (req, res, next) => {

    const { _id: owner } = req.payload
    const { name, date, description, products, location } = req.body

    Event
        .create({ name, date, description, products, location, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOneEvent/:id', (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/editEvent/:id", verifyToken, (req, res, next) => {

    const { id } = req.params
    const { name, date, description } = req.body

    const updatedEvent = {}
    if (name) updatedEvent.name = name
    if (date) updatedEvent.date = date
    if (description) updatedEvent.description = description

    Event
        .findByIdAndUpdate(id, updatedEvent, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete("/deleteEvent/:id", verifyToken, (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router