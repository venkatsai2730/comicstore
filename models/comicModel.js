const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    yearOfPublication: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    numberOfPages: { type: Number },
    condition: { type: String, enum: ['new', 'used'], required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Comic', comicSchema);
