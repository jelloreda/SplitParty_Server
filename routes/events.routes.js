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
    exitEvent
} = require('../controllers/events.controllers')

router.get('/getAllEvents', getAllEvents)
router.get('/getOneEvent/:id', getOneEvent)
router.get('/getJoinedEvents', verifyToken, getJoinedEvents)
router.post('/saveEvent', verifyToken, saveEvent)
router.get('/getUserEvents/:user_id', verifyToken, getUserEvents)
router.put('/editEvent/:id', verifyToken, editEvent)
router.put('/joinEvent', joinEvent)
router.put('/exitEvent', exitEvent)
router.delete('/deleteEvent/:id', verifyToken, deleteEvent)


module.exports = router