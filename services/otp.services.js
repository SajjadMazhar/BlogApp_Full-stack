const nodemailer = require("nodemailer")

function mailOTP(otp, email){

    let transport = nodemailer.createTransport({
        service:"gmail", 
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    let mailOptions =  {
        from:process.env.EMAIL,
        to:email,
        subject:"Verification One Time Password",
        text:`Hi, your OTP is ${otp}`
    }

    transport.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
            res.send("error")
        }else{
            console.log("sent "+info.response)
        }
    })
}

module.exports = {
    mailOTP
}

