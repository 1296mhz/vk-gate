/**
 * Created by cshlovjah on 09.02.18.
 */
var timeIterator = async function (cb, ...arr) {
    function delay(t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, t)
        })
    };

    for (let i of arr[0]) {
        await delay(i.time);
        cb(i.text)
    };
}

module.exports = timeIterator;