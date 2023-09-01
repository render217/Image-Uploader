const express = require('express')
const imageController = require('./image.controller')
const router = express.Router();
const upload = require('../middlewares/multer')

router.get('/',imageController.index)
router.post('/upload',upload.single('file'),imageController.uploadImage)







module.exports = router;