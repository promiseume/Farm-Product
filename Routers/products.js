const express = require('express');
const router = express.Router();

const Product = require('../models/product')

const categories =  ['fruit','vegetables','dairy']

router.get('/products',async (req,res)=>{
    const { category } = req.query;
    if(category){
      const products = await Product.find({ category })
      res.render('products/index',{ products,category })
    }
    else{
      const products = await Product.find({})
      res.render('products/index',{ products, category: 'All' })
    }
    })
  router.get('/products/new',(req,res) =>{
        res.render('products/new', { categories })
    })
 router.post('/products', async (req,res) =>{
      const newProduct = new Product(req.body)
     await  newProduct.save();
      res.redirect(`/products/${newProduct._id}`)
   })
  router.get('/products/:id', async (req,res)=>{
      const { id } = req.params;
     const product = await Product.findById(id).populate('farm','name')
       res.render('products/details', { product })
    })
  router.get('/products/:id/edit', async (req,res) =>{
      const { id } = req.params;
      const product = await Product.findById(id)
      res.render('products/edit', { product })
  })
  router.put('/products/:id', async (req,res) => {
      const { id } = req.params;
     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
     res.redirect(`/products/${product._id}`);
  })
  router.delete('/products/:id', async (req,res) => {
    const { id } = req.params;
   const deletedProduct = await Product.findByIdAndDelete(id)
   res.redirect('/products')
  })

  module.exports = router;
    