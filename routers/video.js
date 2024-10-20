const express = require('express');
const upload = require('../utils/uploader');
const videoController = require('../controls/video');
const router = express.Router();

router.post('/', upload.single('video'), videoController.createVideo);

router.get('/',videoController.getAll)

router.delete('/:id', videoController.deleteVideo);

module.exports = router;
