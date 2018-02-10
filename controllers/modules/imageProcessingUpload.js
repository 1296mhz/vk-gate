const config = require('../../config/config.json');
const fs = require('graceful-fs');
const GetMessagesUploadServer = require('./methods/getMessagesUploadServer');
const UploadImage = require('./methods/uploadImage');
const SaveMessagesPhoto = require('./methods/saveMessagesPhoto');

module.exports = (obj) => {

    return new Promise((resolve, reject) => {

        let objParams = {
            peer_id: obj.peer_id,
            image: obj.image,
            access_token: obj.access_token,
            v: obj.v
        }

        let formData = {
            field: 'file',
            file: fs.createReadStream(obj.image)
        };

        let params = {
            peer_id: obj.peer_id,
            access_token: obj.access_token,
            v: obj.v
        }

        GetMessagesUploadServer(params)
            .then(res => {
                return res
            })
            .then(res => {
                return UploadImage(res.data.response.upload_url, formData)
            })
            .then(res => {
                res.access_token = objParams.access_token;
                res.v = objParams.v;
                return res
            })
            .then(res => {
                return SaveMessagesPhoto(res)
            })
            .then(res => {
                resolve(res.data.response)
            })
            .catch(err => {
                reject(err)
            })
    });
}


