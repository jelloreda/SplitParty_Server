const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { verifyToken } = require("../middlewares/verifyToken")

router.post('/signup', (req, res, next) => {

  const { username, email, password, avatar } = req.body

  User
    .findOne({ email })
    .then((foundUser) => {

      if (foundUser) {
        res.status(400).json({ message: 'User already exists' })
        return
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      return User.create({ username, email, password: hashedPassword, avatar })
    })
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
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, email, username, avatar } = foundUser; // Agregar role a futuro para renderizado condicional
        const payload = { _id, email, username, avatar }

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        )

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

module.exports = router