const sessionIdToUserMap = new Map();

function setUser (id,user){
    console.log(sessionIdToUserMap);
    sessionIdToUserMap.set(id,user);
}

function getUser (id){
    console.log("********************************")
    console.log(sessionIdToUserMap);
    return sessionIdToUserMap.get(id);
}

module.exports = {setUser,getUser};
