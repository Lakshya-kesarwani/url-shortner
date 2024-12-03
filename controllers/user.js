const User = require('../models/user')


async function handleGetAllUsers(req,res) {
    const allusers = await User.find({});
    return res.json(allusers);
}

async function handlePostUser(req,res){
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
}

async function handleGetById(req,res){
        // const id = Number(req.params.id);
        // const user = users.find(user => user.id == id);
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.json(user);
}

async function handlePatchById(req,res){
    await User.findByIdAndUpdate(req.params.id, {last_name:"Changed"})
    return res.json({ status: 'Success' });
}

async function handleDeleteById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'success' });
}
module.exports = {handleGetAllUsers,
    handlePostUser,
    handleGetById,
    handlePatchById,
    handleDeleteById}