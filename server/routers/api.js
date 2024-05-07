const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require("mongodb");
const post = require('../models/posts');

const db = "mongodb+srv://kutax:Password@test.watsq98.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(db, { serverApi: ServerApiVersion.v1 });



mongoose.Promise = global.Promise;

mongoose.connect(db)
    .then(() => console.log('Connection successfull'))
    .catch((err) => console.log('Connection Error'));

router.get('/posts', (req, res) => {
    console.log('Requesting posts');
    post.getCollection('posts').find({})
        .then((err, posts) => {
            res.json(posts);
            console.log(posts);
        })
        .catch((err) => {
                console.log('Error getting posts');
        });
});

module.exports = router;