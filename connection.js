const mongoose = require('mongoose')

function connectToMongoDb(url){
    return mongoose.connect(url, {
        tlsAllowInvalidCertificates: true, // Add this line if needed
      }).then(()=>{
        console.log("MONGODB CONNECTED!")
    })
}
module.exports = {connectToMongoDb}