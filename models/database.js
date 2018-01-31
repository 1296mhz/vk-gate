/**
 * Created by cshlovjah on 31.01.18.
 */
var mongoose = require('mongoose');
var gracefulShutdown;
var config = require('../config/config.json');

mongoose.Promise = global.Promise;
//Log db
var logDB = mongoose.createConnection(config.dbLogURI);

logDB.on('connected', function () {
    console.log('Mongoose connected to ', config.dbLogURI)
});

logDB.close(function(){
    console.log('Mongoose log disconnected')
})

console.log('Mongoose connect!');
mongoose.connect(config.dbAppURI, { useMongoClient: true });

mongoose.connection.on('connected', function (){
    console.log("Mongoose connected to " + config.dbAppURI)
});

mongoose.connection.on('error', function (err){
    console.log("Mongoose connection error: " + err)
});

mongoose.connection.on('disconnected', function (){
    console.log("Mongoose disconnected")
});

gracefulShutdown = function (msg, callback){
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through '+ msg);
        callback();
    });
}

//nodemon restart
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2')
    })
});

//Kill app
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    })
});

process.on('SIGTERM', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    })
});