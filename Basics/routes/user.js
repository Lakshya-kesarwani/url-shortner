const express = require('express')
const router = express.Router()

const {handleGetAllUsers,
    handlePostUser,
    handleGetById,
    handlePatchById,handleDeleteById
} = require('../controllers/user')

router.route("/").get(handleGetAllUsers).post(handlePostUser); 

router.route('/:id').
    get(handleGetById).
    patch(handlePatchById).
    delete(handleDeleteById)

module.exports = router;