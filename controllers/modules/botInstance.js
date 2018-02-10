/**
 * Created by cshlovjah on 09.02.18.
 */
const API = require('node-vk-bot-api');
const config = require('../../config/config.json');
const botInstance = new API(config.token);

module.exports = botInstance;

