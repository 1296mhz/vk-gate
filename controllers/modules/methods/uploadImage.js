/**
 * Created by cshlovjah on 10.02.18.
 */
const request = require('request');

module.exports = (url, fileData) => {
    return new Promise((resolve, reject) => {
        request.post({url: url, formData: fileData}, (err, httpResponse, body) => {
            if (err) {
                return reject(new Error("Error: " + err));
            }
            let bodyObj = JSON.parse(body);
            resolve(bodyObj)
        });
    })
}