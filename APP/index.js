// importing essential modules
const express = require('express')

// setting up app instance and middlewares
const app = express()
const PORT = 8001
const URL = require('./models/url.js')

app.use(express.urlencoded({ extended: false }))

// importing other modules from directory
const { connectToMongoDb } = require('./connection.js')
const router = require('./routes/url')

// connections
connectToMongoDb("mongodb://localhost:27017/SHORTURL-APP")



// routes
app.use("/", router);
app.get("/:shortId", async (req, res) => {
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
        });
    if(!entry)
        return res.status(404).send("URL not found");
    res.redirect(entry.redirectURL);
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})