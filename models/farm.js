const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name:{
        type:String,
        required: [true, 'Farm must have a name']
    },
    city:{
        type:String
    },
    email:{
        type:String,
        required: [true,'Email is required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

//create a middleware for deleting a Farm
farmSchema.post('findOneAndDelete', async function (farm){
    if (farm.products.length > 0) {
    const res = await Product.deleteMany( { _id: { $in: farm.products } })
    }
})


const Farm = mongoose.model('Farm', farmSchema)
module.exports = Farm;