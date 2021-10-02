const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=> {
   console.log('connection opened')
})
.catch (err => {
    console.log("Oh no error")
    console.log(err)
});

const productSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true
    },
    price:{
       type: Number,
       required: true,
       min: 0
    },
    category:{
      type: String,
      lowercase: true,
      enum : ['fruit','vegetables','dairy']
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;