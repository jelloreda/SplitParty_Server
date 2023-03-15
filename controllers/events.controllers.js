const Event = require("../models/Event.model")


const getAllEvents = (req, res, next) => {

    Event
        .find()
        .sort({ date: 1 })
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const saveEvent = (req, res, next) => {

    const { _id: owner } = req.payload
    const { name, date, time, description, products, location } = req.body

    Event
        .create({ name, date, time, description, products, location, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneEvent = (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .populate('owner')
        .populate('guests')
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editEvent = (req, res, next) => {

    const { id } = req.params
    const { name, date, time, description, products, location } = req.body

    const updatedEvent = {}
    if (name) updatedEvent.name = name
    if (date) updatedEvent.date = date
    if (time) updatedEvent.time = time
    if (description) updatedEvent.description = description
    if (products) updatedEvent.products = products
    if (location) updatedEvent.location = location

    Event
        .findByIdAndUpdate(id, updatedEvent, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteEvent = (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getUserEvents = (req, res, next) => {

    const { _id: id } = req.payload

    Event
        .find({ owner: id })
        .sort({ date: 1 })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getJoinedEvents = (req, res, next) => {

    const { _id: id } = req.payload

    Event
        .find({ guests: { $in: [id] } })
        .sort({ date: 1 })
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const joinEvent = (req, res, next) => {

    const { owner_id, event_id } = req.body

    Event
        .findByIdAndUpdate(
            event_id,
            { $addToSet: { guests: owner_id } },
            { new: true }
        )
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    getAllEvents,
    saveEvent,
    getOneEvent,
    editEvent,
    deleteEvent,
    getUserEvents,
    getJoinedEvents,
    joinEvent
}
