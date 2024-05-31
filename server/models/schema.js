const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Color schema
const ColorSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true }  // This is the hex color code
}, { _id: false });

// Palette schema
const PaletteSchema = new Schema({
    name: { type: String, required: true },
    isVisible: { type: Boolean, required: true },
    colors: [ColorSchema]  // An array of Color documents
}, { _id: false });

// Main schema
const MainSchema = new Schema({
    palettes: [PaletteSchema]  // An array of Palette documents
});

// Create models
const Main = mongoose.model('Main', MainSchema);

module.exports = Main;
