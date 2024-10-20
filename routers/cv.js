// routes/pdfRoutes.js
const express = require('express');
const upload = require('../utils/pdf');
const pdfController = require('../controls/cv');
const userMiddleware=require('../middlewares/user.middelewares')

const router = express.Router();

router.post('/upload', upload.single('pdf'),userMiddleware, pdfController.uploadPdf);

router.delete('/delete',userMiddleware, pdfController.deletePdf);

router.get('/download', pdfController.downloadPdf);

router.get('/', pdfController.showpdf);

module.exports = router;
