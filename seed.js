const mongoose = require('mongoose');
const Product = require('./models/product.js');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=> {
   console.log('connection opened')
})
.catch (err => {
    console.log("Oh no error")
    console.log(err)
});

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1,
//     category: 'fruit'
// })
// p.save().then(p => {
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })

const seedProducts=[
    {
        name: 'Ruby Grapefruit',
        price: 1,
        category: 'fruit'
    },
    {
        name: 'Golden Melon',
        price: 3,
        category: 'fruit'
    },
    {
        name: 'Apple',
        price: 4,
        category: 'fruit'
    },
    {
        name: 'Spinach',
        price: 6,
        category: 'vegetables'
    },
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e =>{
    console.log(e)
})