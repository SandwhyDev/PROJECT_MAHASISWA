const express = require('express');
const path = require("path")
const fs = require("fs")
const ps = require('../prisma/connection');
const { hashPassword, comparePassword } = require('../services/hash_services');
const avatarUpload = require('../services/multer_services');

const user = express.Router()

user.post("/user_register", avatarUpload.single("avatar"),async(req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.user.create({
            data : {
                email : data.email,
                password : hashPassword(data.password),
                avatar : {
                    create : {
                        filename : file.filename,
                        image_path : path.join(__dirname, `../static/uploads/avatar`)
                    }
                }
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

user.post("/user_login", async (req,res)=>{
    try {
        const data = await req.body
        const cekEmail = await ps.user.findUnique({
            where : {
                email : data.email
            }
        })
        if(!cekEmail){
            res.json({
                success : false,
                msg : "email salah"
            })
            return
        }

        const cekPassword = await comparePassword(data.password, cekEmail.password)

        if(!cekPassword){
            res.json({
                success : false,
                msg : "password salah"
            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil login"
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read_all", async (req,res)=>{
    try {
        const result = await ps.user.findMany({
            include : {
                avatar : true,
                biodata : true,
            }
        })
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
            return
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
                id : parseInt(id),
            },
            include : {
                avatar : true
            }
        })
        if(!result){
            res.json({
                success : true,
                msg  : "data tidak ditemukan",
                
            })
            return
        }

        const delete_image = await fs.unlinkSync(path.join(__dirname, `../static/uploads/avatar/${result.avatar.filename}`))
        
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