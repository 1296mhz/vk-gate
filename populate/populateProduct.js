/**
 * Created by cshlovjah on 31.01.18.
 */
require('../models/database');
const Products = require('../models/products');
const config = require('../config/config.json');

const _ = require('underscore');

const appleObj = {
    name: "Яблоко",
    price: 101,
    amount: 10,
    image: 'populate/images/apple.png'
}

const orangeObj = {
    name: "Апельсинка",
    price: 209,
    amount: 10,
    image: 'populate/images/orange.png'
}

async function upload(){

    const apple = new Products(appleObj);
    const orange = new Products(orangeObj);

    await apple.save({}, function (data) {
        console.log("Apple");
        return data
    });

    await orange.save({}, function (data) {
        console.log("Orange");
        return data
    });

    await process.exit();
}

upload();
