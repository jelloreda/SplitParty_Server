const router = require("express").Router()

const {
    getAllProducts,
    getEditProducts,
    saveProduct,
    getOneProduct,
    editProduct,
    deleteProduct
} = require("../controllers/products.controllers")

router.get("/getAllProducts", getAllProducts)
router.post("/getEditProducts", getEditProducts)
router.post("/saveProduct", saveProduct)
router.get("/getOneProduct/:id", getOneProduct)
router.put("/editProduct/:id", editProduct)
router.delete("/deleteProduct/:id", deleteProduct)


module.exports = router