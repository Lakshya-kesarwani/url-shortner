const express = require('express');
const router = express.Router();
const URL = require('../models/url.js');
const {restrictTo} = require('../middlewares/auth.js')

router.get('/admin/urls',restrictTo(["ADMIN"]),async(req,res)=>{
    // if (!req.user) return res.redirect("/login");
    const urls = await URL.find({ });
    console.log(req.user);
    res.render("home",{
        urls:urls })
})


router.get("/",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    // if (!req.user) return res.redirect("/login");
    const urls = await URL.find({ createdBy: req.user._id });
    console.log(req.user);
    res.render("home",{
        urls:urls })
})

router.get('/signup',(req,res)=>{
    return res.render("signup")
})
router.get('/login',(req,res)=>{
    return res.render("login")
})
module.exports = router