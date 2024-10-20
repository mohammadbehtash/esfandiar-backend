const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    
    image: {
        type: String,
        required: true,
    },
});

const Image = mongoose.model('CvImage', ImageSchema);

module.exports = Image;