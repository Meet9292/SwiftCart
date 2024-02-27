const registration = require("../../Schemas/registerSchema.js");
const cart = require("../../Schemas/cartSchema.js");
const bcrypt = require("bcrypt");
const sendEmail = require("../../../Emails/Otp.js");

const registerController = {
  async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const hashedpassword = await bcrypt.hash(password, 10);
      const done = await registration.create({
        username: username,
        email: email,
        password: hashedpassword,
      });
      if (done) {
        await cart.create({ email: email }, { products: [] });
        res.json({ msg: "done" });
      }
    } catch (e) {
      console.log(e);
    }
  },
  async otp(req, res, next) {
    const { email, otp } = req.body;
    sendEmail(email, otp);
    res.json({ msg: "OTP" });
  },
  async changeusername(req,res,next){
    const { email ,username} = req.body;
    const data = await registration.findOneAndUpdate({email:email},{username:username})
    if(data){
      res.json({msg:"Updated"})
    }
  },
};

module.exports = registerController;
