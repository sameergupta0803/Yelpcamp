const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("Error:" + err)
    })
const sample = (array) => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 20) + 10,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod cum, nam, sequi ullam quam eveniet sapiente nobis ea cumque, impedit aliquid excepturi. Eligendi dolorem quos nobis culpa cum nulla iste?',
            location: `${sample(cities).city},${sample(cities).state}`
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})