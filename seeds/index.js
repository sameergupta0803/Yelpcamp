const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./citiesIndia');
const images = require('./images')
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
        const randomCity = sample(cities);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 4500) + 500,
            author: '69acb33a3857911925d7d0ee',
            images: [sample(images)],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod cum, nam, sequi ullam quam eveniet sapiente nobis ea cumque, impedit aliquid excepturi. Eligendi dolorem quos nobis culpa cum nulla iste?',
            location: `${randomCity.city},${randomCity.admin_name}`
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})