const Product = require("../models/Product.model")

const getAllProducts = (req, res, next) => {

    Product
        .find()
        .sort({ name: 1 })
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getEditProducts = (req, res, next) => {

    const { selectedProductsIds } = req.body

    Product
        .find({ _id: { $nin: selectedProductsIds } })
        .sort({ name: 1 })
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const saveProduct = (req, res, next) => {

    const { name, price, picture } = req.body

    Product
        .create({ name, price, picture })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOneProduct = (req, res, next) => {

    const { id } = req.params

    console.log(req.payload)

    Product
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editProduct = (req, res, next) => {

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
}

const deleteProduct = (req, res, next) => {

    const { id } = req.params

    Product
        .findByIdAndDelete(id)
        .then(() => console.log('Producto elminado'))
        .catch(err => next(err))
}

module.exports = {
    getAllProducts,
    getEditProducts,
    saveProduct,
    getOneProduct,
    editProduct,
    deleteProduct
}