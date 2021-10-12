const express = require('express');
const ps = require('../prisma/connection');

const bio = express.Router()

bio.post("/biodata_create", async (req,res)=>{
    try {
        const data = await req.body
        const result = await ps.biodata.create({
            data : {
                ...data
            }
        })

        res.json({
            success : true,
            msg : "berhasil buat biodata",
            data : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

module.exports = bio