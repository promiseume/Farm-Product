const express = require('express');
const product = require('./products');
const router = express.Router();

const Farm = require('../models/farm')
const categories =  ['fruit','vegetables','dairy']

router.get('/farms',async (req,res) => {
    const farms = await Farm.find({});
    res.render('farms/index',{ farms })
  })
  
  router.get('/farms/new',(req,res) => {
      res.render('farms/new')
  })
  
  router.delete('/farms/:id', async(req,res) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndDelete(id)
     res.redirect('/farms')
  })

  router.get('/farms/:id', async (req,res) => {
    const { id } = req.params;
     const farm = await Farm.findById(id).populate('products');
     console.log(farm);
     res.render('farms/details', { farm })
  })
  
  router.post('/farms', async (req,res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms')
  })
  
  router.get('/farms/:id/products/new',async (req,res) =>{
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
  })
  
  router.post('/farms/:id/products', async (req,res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category});
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`)
  })
  
  module.exports = router;