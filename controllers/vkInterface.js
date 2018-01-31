const Product = require('../models/products');
const Order = require('../models/orders');
const _ = require('underscore');
const moment = require('moment');
const API = require('node-vk-bot-api');
const config = require('../config/config.json')

const request = require('request');
const uploadImage = require('./modules/uploadImage').uploadImage
const interfaceVk = new API(config.vkToken);
moment.locale('ru');

interfaceVk.command('список', async (ctx) => {

    ctx.reply('Спсиок товаров: ')

    var product = await Product.find({amount: {$gte: 0}}, (err, productDoc) => {
        if (err) {
            interfaceVk.reply(ctx.peer_id, "Товары отсутствуют!")
        }
        return productDoc
    });

    interfaceVk.reply(ctx.peer_id, "Всего позиций: " + product.length)

    for (var x = 0; x < product.length; x++) {
        setTimeout(function (y) {

            var _productObject = {
                name: product[y].name,
                price: product[y].price,
                amount: product[y].amount,
                image: product[y].image
            }

            uploadImage(ctx.peer_id, _productObject)

        }, x * 1000, x)
    }
    ;
});

interfaceVk.hears(/(купить)/, async (ctx) => {

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
                interfaceVk.reply(ctx.peer_id, "Ваш заказ получен,наш менеджер свяжется с вами в ближайшее время.");
            });
        });

    } else {
        interfaceVk.reply(ctx.peer_id, "Не указан товар.");
    }
});

interfaceVk.hears('статус', async (ctx) => {

    var order = await Order.find({vkId: ctx.peer_id}, function (err, docs) {
        return docs
    });

    if (order.length !== 0) {
        console.log("Всего заявки: ")
        interfaceVk.reply(ctx.peer_id, "Всего заявок: " + order.length)
        for (var x = 0; x < order.length; x++) {
            setTimeout(function (y) {
                interfaceVk.reply(ctx.peer_id, "Наименование: " + order[y].name + "\n" + " Дата: " + moment(order[y].createdAt).format('LLL'))
            }, x * 2000, x)
        }
    } else {
        interfaceVk.reply(ctx.peer_id, "У вас нет заказов")
    }
});

interfaceVk.hears('помощь', (ctx) => {
    interfaceVk.reply(ctx.peer_id, "список - список товаров\n");
    interfaceVk.reply(ctx.peer_id, "купить Название товара - купить товаров\n");
    interfaceVk.reply(ctx.peer_id, "статус - список заказов\n");
});

interfaceVk.listen();

module.exports = interfaceVk