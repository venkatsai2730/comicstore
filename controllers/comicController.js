const paginateAndSort = require('../utils/pagination');
const Comic = require('../models/comicModel');
const mongoose = require('mongoose');

// Create a comic book
exports.createComic = async (req, res) => {
    try {
        const comic = new Comic(req.body);
        await comic.save();
        res.status(201).json(comic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a comic book
exports.updateComic = async (req, res) => {
    try {
        const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.json(comic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a comic book
exports.deleteComic = async (req, res) => {
    try {
        const comic = await Comic.findByIdAndDelete(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.json({ message: 'Comic deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get comic details
exports.getComic = async (req, res) => {
    const comicId = req.params.id;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(comicId)) {
        return res.status(400).json({ message: 'Invalid comic ID format' });
    }

    try {
        const comic = await Comic.findById(comicId);
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }
        res.json(comic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all comics with pagination and sorting
exports.getComics = async (req, res) => {
    try {
        const filters = {};  // Define any filters here if needed
        const options = {
            page: req.query.page,
            limit: req.query.limit,
            sort: req.query.sort
        };
        
        const comics = await paginateAndSort(Comic, filters, options);
        res.json(comics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
