const sessionIdToUserMap = new Map();

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET


function setUser (user){
  
    return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
    },secretKey);
}

function getUser (token){
    if(!token)return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {setUser,getUser};
