const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const farmRoutes = require('./Routers/farm');
const productRoutes = require('./Routers/products')


mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=> {
   console.log('connection opened')
})
.catch (err => {
    console.log("Oh no error")
    console.log(err)
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'));



//Routes to farm and product
app.use('/',farmRoutes);
app.use('/',productRoutes);

app.listen(3000,() => {
    console.log('listening at port 3000')
})
