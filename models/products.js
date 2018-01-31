/**
 * Created by cshlovjah on 31.01.18.
 */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    image: String
});

var ordersSchema = mongoose.Schema({
    name: String,
    vkId: String,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Product', productSchema);