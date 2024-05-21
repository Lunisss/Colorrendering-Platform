const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const coloursModel = require('../models/poland');

const db = "mongodb+srv://kutax:Password@test.watsq98.mongodb.net/Colours?retryWrites=true&w=majority";
const db2 = "mongodb+srv://Lunis:XfjGpTIHBfmMuFfx@cluster0.9eoyogn.mongodb.net/Colours?retryWrites=true&w=majority&appName=Cluster0"


mongoose.Promise = global.Promise;

mongoose.connect(db2)
    .then(() => console.log('Connection successfull'))
    .catch((err) => console.log(err));

router.get('/colours', (req, res) => {
    console.log('Requesting posts');
    
    coloursModel.find({})
        .then((data) => {
            res.json(data);
            console.log(data);
        })
        .catch((err) => {
                console.log('Error getting posts');
        });
});


module.exports = router;