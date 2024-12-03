const express = require("express")
const app = express()
const http = require("http")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

app.use(express.urlencoded({ extended:false }))

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


app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map(user=> `<li> ${user.first_name} </li>`).join(' ')}}
    </ul>`
    return res.send(html);
})

app.get("/api/users",(req,res)=>{
    res.setHeader('myname', 'Lakshya');
    return res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user=>user.id == id);
    if(!user){
        return res.status(404).send("User not found");
    }
    return res.json(user);
})
// ----------------------------------------------
app.post('/api/users',(req, res)=>{

        const body = req.body;

        if(!(body && body.first_name && body.last_name && body.email && body.gender && body.job_title)){
            return res.status(400).send("Bad Request: Missing required fields");
        }
        // console.log(body);
        users.push({...body,
            id: users.length + 1})
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
            return res.status(201).json({status: "success", id: users.length})
        });
})
// app.path('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// app.delete('/api/users/:id',(req, res)=>{
//     return res.json({status: 'pending'});
// })
// ----------------------------------------

// using single route for all /api/users/:id
app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user=>user.id == id);
    if(!user){
        return res.status(404).send("User not found");
    }
    return res.json(user);
}).patch((req, res) => {
    return res.json({status: 'pending'});
}).delete((req, res) => {
    return res.json({status: 'pending'});
})

app.listen(3000, () => {
    console.log("Server is running on port 3000  http//:localhost:3000/")
})