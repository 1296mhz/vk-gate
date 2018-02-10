/**
 * Created by cshlovjah on 10.02.18.
 */

const axios = require('axios');
const {stringify} = require('querystring');

module.exports = (obj) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.vk.com/method/photos.saveMessagesPhoto?` + stringify(obj))
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}