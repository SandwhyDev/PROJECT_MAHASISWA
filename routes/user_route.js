const express = require('express');
const ps = require('../prisma/connection');

const user = express.Router()

user.post("/user_register", async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.user.create({
            data : {
                ...data
            }
        })
        res.json({
            success : true,
            msg : "berhasil register",
            data : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read", async (req,res)=>{
    try {
        const result = await ps.user.findMany()
        res.json({
            success : true,
            data : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.put("/user_update/:id", async (req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.user.update({
            where : {
                id : parseInt(id)
            },
            data : data
        })
        if(!result){
            res.json({
                success : false,
                msg : "data tidak ditemukan ",
                
            })
        }
        res.json({
            success : true,
            msg : "berhasil update",
            data : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.delete("/user_delete/:id", async (req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.user.delete({
            where : {
                id : parseInt(id)
            }
        })
        if(!result){
            res.json({
                success : true,
                msg  : "data tidak ditemukan",
                
            })
        }
        res.json({
            success : true,
            msg  : "berhasil delete",
            data : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})


module.exports = user