const express = require("express")
const app = express()
const http = require("http")
// const users = require("./MOCK_DATA.json")
const fs = require("fs")
const mongoose = require("mongoose")
const { Timestamp } = require("bson")

// CONNECTION
mongoose
    .connect("mongodb://localhost:27017/app")
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=> console.log("MongoDB Error",err))

//SCHEMA
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
},{timestamps:true});

const User =mongoose.model('user',userSchema);
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log("hello from middleware 1");
    next();
    // return res.json({msg:"hello from middleware 1"})
})
app.use((req, res, next) => {
    console.log("hello from middleware 2");
    // return res.send("hello from middleware 2")
    next();
})


app.get("/users", async(req, res) => {

    const dbUsers = await User.find({});

    const html = `
    <body style="background-color:#000">
    <h2 style="color:#fff">Users</h2>
    <ul>
        ${dbUsers.map(user => `<li style="color:#fff"> ${user.first_name} - ${user.email} </li>`).join(' ')}}
    </ul>
    </body>`

    return res.send(html);
})

app.get("/api/users", async(req, res) => {
    // res.setHeader('myname', 'Lakshya');
    const allusers = await User.find({});
    return res.json(allusers);
})

app.get("/api/users/:id", async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find(user => user.id == id);
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send("User not found");
    }
    return res.json(user);
})
// ----------------------------------------------
app.post('/api/users', async(req, res) => {

    const body = req.body;

    if (!(body && body.first_name && body.last_name && body.email && body.gender && body.job_title)) {
        return res.status(400).send("Bad Request: Missing required fields");
    }
    // console.log(body);
    // users.push({
    //     ...body,
    //     id: users.length + 1
    // })
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "success", id: users.length })
    // });

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender
    })
    console.log(body);
    return res.status(201).json({ status: "success"})
})
// app.path('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// app.delete('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// ----------------------------------------

// using single route for all /api/users/:id
app.route('/api/users/:id').get(async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find(user => user.id == id);
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return res.status(404).send("User not found");
    }
    return res.json(user);
}).patch(async(req, res) => {

    await User.findByIdAndUpdate(req.params.id, {last_name:"Changed"})

    return res.json({ status: 'Success' });
}).delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'success' });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000  http//:localhost:3000/")
})