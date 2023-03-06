const router = require("express").Router()

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const usersRoutes = require("./users.routes")
router.use("/users", usersRoutes)

const eventRoutes = require("./events.routes")
router.use("/events", eventRoutes)

const productRoutes = require("./products.routes")
router.use("/products", productRoutes)

module.exports = router
