const { Schema, model } = require("mongoose")
const User = require("./User.model")

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    brand: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true
    },
    unit: {
      type: String
    },
    quantity: {
      type: Number
    },
    picture: {
      type: String,
      default: 'https://cdn.icon-icons.com/icons2/1933/PNG/512/iconfinder-picture-images-photo-image-camera-4593187_122267.png'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  {
    timestamps: true
  }
)

const Product = model("Product", productSchema)

module.exports = Product
