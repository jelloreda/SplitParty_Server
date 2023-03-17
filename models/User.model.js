const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Event = require("./Event.model")
const Product = require("./Product.model")



const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [4, 'Password must be at least 4 characters long']
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dztjq7i4a/image/upload/v1679050445/user_icon-icons.com_57997_gckafe.png',
      set: value => value ? value : value = 'https://res.cloudinary.com/dztjq7i4a/image/upload/v1679050445/user_icon-icons.com_57997_gckafe.png'
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {

  const { _id, username, email, avatar, events, products, friends } = this
  const payload = { _id, username, email, avatar, events, products, friends }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema)

module.exports = User
