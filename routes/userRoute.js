const express = require("express");
const router = express.Router();
const productSchema = require('../models/product')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("./auth");
'http://localhost:6010/register'
router.post("/register", async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;
    const isemail = await productSchema.findOne({ email });
    if (isemail) {
      return res.status(400).send({ message: "this email is alredy exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await productSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({userId:user.id},'1234564')
    res.status(201).json({ message: "User created!", user ,token});
  } catch (e) {
    res.send({ message: e.message });
  }
});
'http://localhost:6010/profile'
router.post('/login',async(req,res)=>{
try{ 
   const {email,password}=req.body
  const user=await productSchema.findOne({email})
  if(!user){
    return res.status(404).send('Invalid Email or Password')
  }
  const isMatch= await bcrypt.compare(password,user.password)
  if (!isMatch) {
    return res.status(400).send('Invalid Email or Password');
  }
  const token = jwt.sign({userId:user.id}, '1234564',{expiresIn:'7 days'})
  res.status(200).send({user,token})}
  catch(e){
    res.status(500).send({message:e.message})
  }
})
'http://localhost:6010/profile'
router.get('/profile',isAuth,(req,res)=>{
try {
  res.status(200).send({user:req.user})
} catch (e) {
  res.status(500).send({message:e.message})
}
})
router.patch('/update/:id',isAuth, async (req, res) => {
try {
  const id = req.params.id
  const usr = await productSchema.findByIdAndUpdate(id, req.body, { new: true })
  if (!usr) {
    return res.status(404).send("No User Found")
  }
  res.status(200).send(usr);
} catch (e) {
  console.log({message:e.message});
  res.status(500).send({ message: e.message });
}});
'http://localhost:6010/all'
router.get('/all',isAuth,async(req,res)=>{
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({message: "Unauthorized access"})
    }
    const user = req.user
    const users = await productSchema.find()
    if(!user) return res.status(404).send({message:'no user found'})
    res.status(200).send({users,user})
  } catch (e) {
    res.status(500).send({message:e.message})
  }
})
router.patch('/profile/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const user = await productSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, req.body);

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    const token = jwt.sign({ userId: updatedUser.id }, 'your-secret-key', { expiresIn: '7 days' });

    res.json({ user: updatedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
