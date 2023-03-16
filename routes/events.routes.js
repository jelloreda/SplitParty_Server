const router = require('express').Router()

const { verifyToken } = require('../middlewares/verifyToken')

const {
    getAllEvents,
    saveEvent,
    getOneEvent,
    editEvent,
    deleteEvent,
    getUserEvents,
    getJoinedEvents,
    joinEvent,
} = require('../controllers/events.controllers')

router.get('/getAllEvents', getAllEvents)
router.post('/saveEvent', verifyToken, saveEvent)
router.get('/getOneEvent/:id', getOneEvent)
router.put('/editEvent/:id', verifyToken, editEvent)
router.delete('/deleteEvent/:id', verifyToken, deleteEvent)
router.get('/getUserEvents', verifyToken, getUserEvents)
router.get('/getJoinedEvents', verifyToken, getJoinedEvents)
router.put('/joinEvent', joinEvent)


module.exports = router