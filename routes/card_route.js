const express = require('express');
const ps = require('../prisma/connection');
const avatarUpload = require('../services/multer_services');

const avatar = express.Router()

avatar.post("/avatar_create", avatarUpload.single("avatar"),async (req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.avatar.create({
            data : {
                ...data
            }
        })
        res.json({
            success : true,
            msg : "berhasil buat avatar",
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

module.exports = avatar