const router = require('express').Router()

const uploaderMiddleware = require('../middlewares/uploader.middleware')

const { uploaderMiddlewareroute } = require('../controllers/upload.controllers')


router.post('/image', uploaderMiddleware.single('imageData'), uploaderMiddlewareroute)


module.exports = router