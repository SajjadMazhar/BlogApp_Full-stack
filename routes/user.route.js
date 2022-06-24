const router = require('express').Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const client = require('../database/redis');
const { verifyToken } = require('../middlewares/user.middleware');
const { mailOTP } = require('../services/otp.services');
const { createToken } = require('../services/user.services');

router.post("/signup", async(req, res)=>{
  let {name, email, password} = req.body
  const otp = otpGenerator.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false})
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
    await client.setEx(user.id.toString(), 120, otp)
    mailOTP(otp, user.email)
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

router.post("/verify", verifyToken, async(req, res)=>{
  const {otp} = req.body
  const userId = req.userValues.id
  try {
    const user = await prisma.user.findUnique({where:{id:userId}})
    const cacheOtp = await client.get(userId.toString())
    if(!cacheOtp) return res.status(400).json({title:"error", msg:"otp expired, generate a new one"});
    if(user.verified) return res.status(400).json({title:"error", msg:"otp expired, generate a new one"});
    if(cacheOtp !== otp) return res.status(400).json({err:"bad request", msg:"otp did not match"});
    await prisma.user.update({
      where:{
          id:userId
      },
      data:{
          verified:true
      }
  })
  res.json({status:"success", verified:true})
  } catch (error) {
    res.status(500).json({status:"failed", error:error.message})
  }
})

router.get("/generateotp/:userId", async(req, res)=>{
  const userId = parseInt(req.params.userId)
  if(!req.params.userId){
    return res.status(400).json({status:"error", msg:"missing user id"})
  }
  try {
    const user = await prisma.user.findUnique({where:{id:userId}})
    if(user.verified) return res.status(400).json({status:"error", msg:"account is already verified"});
    const newOtp = otpGenerator.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false})
    await client.setEx(userId.toString(), 120, newOtp)
    mailOTP(newOtp, user.email)
    res.json({status:"success", otp:newOtp})
  } catch (error) {
    res.status(500).json({status:"failed", error:error.message})
  } 
})

router.post("/signin", async (req, res)=>{
  const {email, password} = req.body
  if(!(email&&password)){
    return res.status(400).json({
      status:"error", msg:"email and password required"
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

router.get("/protected",async (req,res)=>{
  const users= await prisma.user.findMany()
  res.json(users)
})
module.exports = router;
