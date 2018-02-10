/**
 * Created by cshlovjah on 09.02.18.
 */
const list = require('./botInstance');
const imageProcessingUpload = require('./imageProcessingUpload')
const Product = require('../../models/products')
const timeIterator = require('./methods/timeIterator')
const config = require('../../config/config.json')
list.command('список', async (ctx) => {

    ctx.reply('Спсиок товаров: ')

    var product = await Product.find({amount: {$gte: 0}}, (err, productDoc) => {
        if (err) {
            list.reply(ctx.peer_id, "Товары отсутствуют!")
        }
        return productDoc
    });

    list.reply(ctx.peer_id, "Всего позиций: " + product.length)

    var productQueue = [];

    for (var x = 0; x < product.length; x++) {

        var _productObject = {
            peer_id: ctx.peer_id,
            access_token: config.token,
            v: config.v,
            name: product[x].name,
            price: product[x].price,
            amount: product[x].amount,
            image: product[x].image
        }

        productQueue.push({
            time: 2000,
            text: _productObject
        })
    }

    function SendMessage(param){
        imageProcessingUpload(param)
            .then((data) => {
                list.reply(
                    param.peer_id,
                    "Название: " + param.name + "\n" +
                    "Цена: " + param.price + "\n" +
                    "Колличество: " + param.amount,
                    attachment = ['photo' + config.user_id + "_" + data[0].id])
            })
    }

    timeIterator(SendMessage, productQueue);
});

module.exports = list
