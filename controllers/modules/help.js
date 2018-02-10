/**
 * Created by cshlovjah on 09.02.18.
 */
var help = require('./botInstance')

help.hears('помощь', (ctx) => {
    help.reply(ctx.peer_id, "список - список товаров\n купить Название_товара - купить\n статус - список заказов\n");
});

module.exports = help;