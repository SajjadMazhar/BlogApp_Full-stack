const router = require('express').Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");
const { verifyToken } = require('../middlewares/user.middleware');
const { createToken } = require('../services/user.services');

router.post("/signup", async(req, res)=>{
  let {name, email, password} = req.body
  if(!(name&&email&&password)){
    return res.status(400).json({
      status:"error", msg:"some inputs are empty"
    })
  }
  try {
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)
    password = null
    const user = await prisma.user.create({
      data:{
        name, email, password:hashedPassword
      }
    })
    const token = createToken(user.id, user.name, user.email)
    res.status(201).json({
      status:"created", user, token
    })
  } catch (error) {
    res.status(500).json({
      status:"error", msg:error.message
    })
  }
})

router.post("/signin", async (req, res)=>{
  const {email, password} = req.body
  if(!(email&&password)){
    return res.status(400).json({
      status:"error", msg:"email or password is missing"
    })
  }
  try {
    const user = await prisma.user.findUnique({
      where:{email}
    })
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(!isPasswordMatched){
      return res.status(400).json({
        title:"error", msg:"email or password is wrong"
      })
    }
    const token = createToken(user.id, user.name, user.email)
    res.status(200).json({
      title:"success", user, token
    })
  } catch (error) {
    res.status(500).json({
      status:"failed", msg:error.message
    })
  }
})

router.get("/protected", verifyToken, (req,res)=>{
  console.log(req.userValues)
})
module.exports = router;
