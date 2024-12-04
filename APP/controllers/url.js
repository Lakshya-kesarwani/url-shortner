const URL = require('../models/url');
const shortid = require("shortid");


async function handleGenerateNewShortUrl(req,res) {

    const body = req.body;
    if(!body){
        return res.status(400).json({ message: 'No data provided' });
    }
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL: body.redirectURL,
        visitHistory: [],   
        createdBy: req.user._id,

    })

    // return res.json({id: shortID})    
    return res.render('home',{
        shortID: shortID,
        redirectURL: body.redirectURL,
        message: 'Short URL generated successfully!'  // add message to frontend
    })

}


async function handleGetAnalytics(req,res) {
    const shortID = req.params.shortID
    const result = await URL.findOne({ shortId: shortID })

    if(!result){
        return res.status(404).json({ message: 'Short ID not found' });
    }
    console.log(result)
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
    
}


module.exports ={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}