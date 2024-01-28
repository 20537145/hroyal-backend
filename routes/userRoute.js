const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("./auth");
'https://localhost:300/register'
router.post("/register", async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;
    const isemail = await userSchema.findOne({ email });
    if (isemail) {
      return res.status(400).send({ message: "this email is alredy exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({userId:user.id},process.env.SECRET_TOKEN)
    res.status(201).json({ message: "User created!", user ,token});
  } catch (e) {
    res.send({ message: e.message });
  }
});
'https://localhost:300/profile'
router.post('/login',async(req,res)=>{
try{ 
   const {email,password}=req.body
  const user=await userSchema.findOne({email})
  if(!user){
    return res.status(404).send('Invalid Email or Password')
  }
  const isMatch= await bcrypt.compare(password,user.password)
  if (!isMatch) {
    return res.status(400).send('Invalid Email or Password');
  }
  const token = jwt.sign({userId:user.id}, process.env.SECRET_TOKEN,{expiresIn:'7 days'})
  res.status(200).send({user,token})}
  catch(e){
    res.status(500).send({message:e.message})
  }
})
'https://localhost:300/profile'
router.get('/profile',isAuth,(req,res)=>{
try {
  res.status(200).send({user:req.user})
} catch (e) {
  res.status(500).send({message:e.message})
}
})
'https://localhost:300/all'
router.get('/all',isAuth,async(req,res)=>{
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({message: "Unauthorized access"})
    }
    const user = req.user
    const users = await userSchema.find()
    if(!user) return res.status(404).send({message:'no user found'})
    res.status(200).send({users,user})
  } catch (e) {
    res.status(500).send({message:e.message})
  }
})
module.exports = router;