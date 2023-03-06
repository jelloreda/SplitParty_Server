const { Schema, model } = require("mongoose")
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
      required: [true, 'Password is required.']
    },
    avatar: {
      type: String,
      default: 'https://cdn.icon-icons.com/icons2/632/PNG/512/user_icon-icons.com_57997.png'
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

const User = model("User", userSchema)

module.exports = User
