const { Schema, model } = require("mongoose")
const Product = require("./Product.model")
const User = require("./User.model")

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'The date is obligatory']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be min. 10 characters']
    },
    banner: {
      type: String,
      default: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxM[…]G90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    guests: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    location: {
      type: String,
    }
    // { //
    //   type: {
    //     type: String,
    //     enum: ['Point']
    //   },
    //   coordinates: {
    //     type: [Number]
    //   }
    // }
  },
  {
    timestamps: true
  }
)

const Event = model("Event", eventSchema)

module.exports = Event
