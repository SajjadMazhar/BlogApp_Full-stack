const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.createToken = (id,name,email, ttx='24h')=>{
    return jwt.sign({id, name, email}, process.env.SECRET, {expiresIn:ttx})
}
