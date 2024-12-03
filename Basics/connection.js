const mongoose = require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url).then(()=>console.log('Connected MONGODB'));
}

module.exports = {connectMongoDb,};