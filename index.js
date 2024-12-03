const express = require("express")
const {connectMongoDb} = require('./connection.js')


const router  = require("./routes/user")
const {logreqres } = require("./middlewares")

const app = express()
const PORT = 3000;

// const http = require("http")
// const users = require("./MOCK_DATA.json")
// const fs = require("fs")

// const { Timestamp } = require("bson")


// CONNECTION
connectMongoDb('mongodb://localhost:27017/app')

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(logreqres("log.txt"));

// ROUTES
app.use("/users",router);

app.listen(PORT, () => {
    console.log("Server is running on port 3000  http//:localhost:3000/user")
})

// app.use((req, res, next) => {
//     console.log("hello from middleware 1");
//     next();
//     // return res.json({msg:"hello from middleware 1"})
// })
// app.use((req, res, next) => {
//     console.log("hello from middleware 2");
//     // return res.send("hello from middleware 2")
//     next();
// })



// app.get("/users", async(req, res) => {

//     const dbUsers = await User.find({});

//     const html = `
//     <body style="background-color:#000">
//     <h2 style="color:#fff">Users</h2>
//     <ul>
//         ${dbUsers.map(user => `<li style="color:#fff"> ${user.first_name} - ${user.email} </li>`).join(' ')}}
//     </ul>
//     </body>`

//     return res.send(html);
// })



// app.get("/api/users/:id", async(req, res) => {
//     // const id = Number(req.params.id);
//     // const user = users.find(user => user.id == id);
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         return res.status(404).send("User not found");
//     }
//     return res.json(user);
// })
// ----------------------------------------------

// app.path('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// app.delete('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// ----------------------------------------

// using single route for all /api/users/:id

