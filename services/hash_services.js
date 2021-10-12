const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10)

const hashPassword = (pass)=>{
    return bcrypt.hashSync(pass, salt)
}

const comparePassword = (pass, hash)=>{
    return bcrypt.compareSync(pass, hash)
}

module.exports = {hashPassword, comparePassword}