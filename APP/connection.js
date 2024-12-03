const mongoose = require('mongoose')

function connectToMongoDb(url){
    return mongoose.connect(url).then(()=>{
        console.log("MONGODB CONNECTED!")
    })
}
module.exports = {connectToMongoDb}