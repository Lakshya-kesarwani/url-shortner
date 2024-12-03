const fs = require('fs');

function logreqres(filename){
    return (req, res, next) => {
        fs.appendFile(filename,
            `/n ${Date.now()} : ${req.ip} ${req.method} : ${req.path}`
        , (err) => {
            next();
        });
    }
}
module.exports = {logreqres,}; 