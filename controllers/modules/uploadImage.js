/**
 * Created by cshlovjah on 31.01.18.
 */
const https = require('https');

const request = require('request');
const fs = require('graceful-fs');
const _ = require('underscore')
const API = require('node-vk-bot-api');
const config = require('../../config/config.json');
const interfaceVk = new API(config.vkToken);

exports.uploadImage = function(peerId, _productName, callback){
    var formData = {
        field: 'my_value',
        file: fs.createReadStream(_productName.image)
    };

    https.get('https://api.vk.com/method/photos.getMessagesUploadServer?peer_id=' + peerId + '&v=5.71&access_token=' + config.vkToken, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var dataObject = JSON.parse(data);
            request.post({url: dataObject.response.upload_url, formData: formData}, function (err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                var bodyObj = JSON.parse(body);
                var dataObject = {
                    server: bodyObj.server,
                    hash: bodyObj.hash
                }

                https.get('https://api.vk.com/method/photos.saveMessagesPhoto?photo=' + bodyObj.photo + '&server=' + dataObject.server + '&hash=' + dataObject.hash + '&v=5.71&access_token=' +
                    config.vkToken, (fileUploadData) => {

                    let data = '';
                    fileUploadData.on('data', (_data) => {
                        data += _data;
                    });

                    fileUploadData.on('end', () => {
                        var dataObject = JSON.parse(data)

                        interfaceVk.reply(
                            peerId, _productName.name +
                            ", цена: " + _productName.price +
                            " остаток: " +
                            _productName.amount, attachment = ['photo' + config.user_id + "_" + dataObject.response[0].id])

                    })
                }).on('error', (err) => {
                    console.error(err)
                });
            });
        });
    }).on('error', (err) => {
        console.error(err);
    })

}
