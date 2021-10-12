const express = require("express")
const cors = require("cors")
const user = require("./routes/user_route")
const bio = require("./routes/biodata_route")
const avatar = require("./routes/card_route")
require("dotenv").config()

const app = express()

const {PORT} = process.env

//middleware
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//route
app.use("/api", user)
app.use("/api", bio)
app.use("/api", avatar)



//listener
app.listen(PORT,()=>{
    console.log(`listened to port ${PORT}`);
})

