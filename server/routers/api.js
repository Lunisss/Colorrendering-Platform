const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Main = require('../models/schema.js');

const db = "mongodb+srv://kutax:Password@test.watsq98.mongodb.net/Colors?retryWrites=true&w=majority";
const db2 = "mongodb+srv://Lunis:XfjGpTIHBfmMuFfx@cluster0.9eoyogn.mongodb.net/Colours?retryWrites=true&w=majority&appName=Cluster0"


mongoose.Promise = global.Promise;

mongoose.connect(db2)
    .then(() => console.log('Connection successfull'))
    .catch((err) => console.log(err));

    router.get('/colors', async (req, res) => {
        console.log('Requesting palettes');
        
        try {
            const data = await Main.find({});
            if (!data) {
                throw new Error('No data found');
            }
            console.log('Data retrieved from the database:', data);
            console.log(data[0]);
            res.json(data[0]);

        } catch (err) {
            console.error('Error getting palettes:', err);
            res.status(500).send('Internal Server Error');
        }
    });


module.exports = router;