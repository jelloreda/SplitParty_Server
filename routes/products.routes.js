const Product = require("../models/Product.model")

const router = require("express").Router()

router.get("/getAllProducts", (req, res, next) => {

    Product
        .find()
        .sort({ name: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => console.log(err))
})


router.post("/saveProduct", (req, res, next) => {

    const { name, price, picture } = req.body

    Product
        .create({ name, price, picture })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOneProduct/:id", (req, res, next) => {

    const { id } = req.params

    console.log(req.payload)

    Product
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.put("/editProduct/:id", (req, res, next) => {

    const { id } = req.params
    const { name, price, picture } = req.body

    const updatedProduct = {}
    if (name) updatedProduct.name = name
    if (price) updatedProduct.price = price
    if (picture) updatedProduct.picture = picture

    Product
        .findByIdAndUpdate(id, updatedProduct, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.delete("/deleteProduct/:id", (req, res, next) => {

    const { id } = req.params

    Product
        .findByIdAndDelete(id)
        .then(() => console.log('Producto elminado'))
        .catch(err => next(err))
})


module.exports = router