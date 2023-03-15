const router = require("express").Router()

const User = require("../models/User.model")
const { verifyToken } = require("../middlewares/verifyToken")

router.post('/signup', (req, res, next) => {

  const { username, email, password, avatar } = req.body

  User
    .create({ username, email, password, avatar })
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide username and password." });
    return;
  }

  User
    .findOne({ username })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return
      }

      if (foundUser.validatePassword(password)) {
        const authToken = foundUser.signToken()
        res.status(200).json({ authToken })
      }
      else {
        res.status(401).json({ message: "Incorrect password" });
      }

    })
    .catch(err => next(err));
})


router.get('/verify', verifyToken, (req, res, next) => {
  res.json(req.payload)
})

router.get('/updateToken', verifyToken, (req, res, next) => {

  const { _id } = req.payload

  User
    .findById(_id)
    .then(user => {
      const newToken = user.signToken()
      res.json(newToken)
    })
    .catch(err => console.log(err))
})

module.exports = router