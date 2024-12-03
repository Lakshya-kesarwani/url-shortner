// importing essential modules
const express = require('express')
const path = require('path');

// setting up app instance and middlewares
const app = express();
const PORT = 8001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))




// importing other modules from directory
const { connectToMongoDb } = require('./connection.js')
const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url.js');

// connections
connectToMongoDb("mongodb://localhost:27017/SHORTURL-APP")


// routes

// app.get("/test",async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home', {allUrls:allUrls})
// })

app.use("/url", urlRouter);
app.use("/",staticRouter);
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
        })
    console.log("passed thorugh this function")
    if(!entry)
        return res.status(404).send("URL not found");
    res.redirect(entry.redirectURL);
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})