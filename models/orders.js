/**
 * Created by cshlovjah on 31.01.18.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ordersSchema = mongoose.Schema({
    name: String,
    vkId: String,
    productId: ObjectId,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', ordersSchema);