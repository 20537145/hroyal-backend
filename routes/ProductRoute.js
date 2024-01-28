
const express = require('express');
const router = express.Router();
const multer = require('multer');
const productSchema = require('../models/product');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Get all products
router.get('/all', async (req, res) => {
  try {
    const products = await productSchema.find({});
    res.status(200).send(products);
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
router.get('/list', async (req, res) => {
  try {
    const products = await productSchema.find({}).limit(8);
    res.status(200).send(products);
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Create a new product with image upload
router.post('/create', upload.single('productImage'), async (req, res) => {
  try {
    const data = req.body;  // For non-file fields
    const image = req.file ? req.file.filename : undefined;  // For the file field

    // Assuming you have fields corresponding to product attributes in your product schema
    const product = await productSchema.create({
      name: data.name,
      reference: data.reference,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      Availability: data.Availability,
      image: image,  // Assuming 'image' corresponds to the field in your MongoDB schema
    });
    
    res.status(201).send(product);
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
router.patch('/:id',async(req,res)=>{
  try {
    const id = req.params.id
    const product = await productSchema.findById(id)
    if(req.body.action === 'increase'){
      product.quantity +=1
    }else if(req.body.action === 'decrease' && product.quantity>0){
      product.quantity -=1
    }
    await product.save()
  } catch (error) {
    res.status(400).send({message:error.message})
  }
})

module.exports = router;
