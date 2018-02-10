/**
 * Created by cshlovjah on 09.02.18.
 */
const buy = require('./botInstance');
const _ = require('underscore');
const Product = require('../../models/products');
const Order = require('../../models/orders');

buy.hears(/(купить)/, async (ctx) => {

    var myString = ctx.body.split(' ');

    myString = _.rest(myString);

    myString = myString.join(' ');

    if (myString != null && myString != '') {

        var newOrderObject = {}

        var product = await Product.findOne({amount: {$gte: 0}, name: myString}, (err, data) => {
            if (err) return null
            return data
        })

        newOrderObject.name = product.name;
        newOrderObject.vkId = ctx.peer_id;
        newOrderObject.productId = product._id;

        product.amount = product.amount - 1;

        var newOrder = new Order(newOrderObject)

        await newOrder.save({}, function () {

            product.save({}, function () {
                console.log("Минус один товар");
                buy.reply(ctx.peer_id, "Ваш заказ получен,наш менеджер свяжется с вами в ближайшее время.");
            });
        });

    } else {
        buy.reply(ctx.peer_id, "Не указан товар.");
    }
});

module.exports = buy
