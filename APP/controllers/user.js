const User = require("../models/user")
const {v4:uuidv4}= require('uuid')
const {setUser,getUser} = require('../service/auth')

async function handleUserSignup(req,res) {
    const {name , email , password}=req.body;

    // if(!name ||!email ||!password){
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/");
}
async function handleUserLogin(req,res) {
    const {email , password}=req.body;

    // if(!name ||!email ||!password){
    //     return res.status(400).json({ message: 'All fields are required' });
    // }
    const user =await User.findOne({
        email,
        password,
    })
    if(!user){
        return res.render("login",{
            error: "Invalid Username or password"
        })}
    const token = setUser(user);
    console.log(user);
    res.cookie('token',token)
    return res.redirect("/");
}

module.exports = {handleUserSignup,handleUserLogin}