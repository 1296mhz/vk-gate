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
    image: '456239853_photo_75'
}

const orangeObj = {
    name: "Апельсинка",
    price: 209,
    amount: 10,
    image: '456239854_photo_75'
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
