// importing essential modules
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser')


// setting up app instance and middlewares
const { checkForAuthentication,restrictTo  } =require('./middlewares/auth')
const app = express();
const PORT = 8001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(checkForAuthentication);

// const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth')




// importing other modules from directory
const { connectToMongoDb } = require('./connection.js')
const URL = require('./models/url.js');

const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/user')

// connections
connectToMongoDb("mongodb://localhost:27017/SHORTURL-APP")


// routes

// app.get("/test",async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home', {allUrls:allUrls})
// })

app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRouter);
app.use('/user',userRoute);
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