/**
 * Created by cshlovjah on 09.02.18.
 */
var status = require('./botInstance');
const Order = require('../../models/orders');
const moment = require('moment');
const timeIterator = require('./methods/timeIterator')

moment.locale('ru');

status.hears('статус', async (ctx) => {

    var order = await Order.find({vkId: ctx.peer_id}, function (err, docs) {
        return docs
    });

    if (order.length !== 0) {
        status.reply(ctx.peer_id, "Всего заказов: " + order.length);

        var statusQueue = [];

        for (var x = 0; x < order.length; x++) {

            var objectSend = {
                peerId: ctx.peer_id,
                orderName: order[x].name,
                orderTime: moment(order[x].createdAt).format('LLL')
            }

            statusQueue.push({
                item: function () {
                    status.reply(objectSend.peerId, "Наименование: " + objectSend.orderName + "\n" + " Дата: " + objectSend.orderTime)
                },
                time: 1000
            });
        }

        timeIterator(statusQueue);

    } else {
        status.reply(ctx.peer_id, "У вас нет заказов")
    }
});

module.exports = status