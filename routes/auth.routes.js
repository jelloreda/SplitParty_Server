const router = require("express").Router()

const { verifyToken } = require("../middlewares/verifyToken")

const {
  signup,
  login,
  verify,
  updateToken
} = require("../controllers/auth.controllers")

router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', verifyToken, verify)
router.get('/updateToken', verifyToken, updateToken)

module.exports = router