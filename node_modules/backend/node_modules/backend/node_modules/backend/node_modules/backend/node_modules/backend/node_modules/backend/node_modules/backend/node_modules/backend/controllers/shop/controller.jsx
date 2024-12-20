const Product = require('../../model/products')

const FilteredProducts= async(req,res)=>{
    try{
        const product = await Product.find({})
        res.status(200).json({success:true, data:product})
    }
    catch(e){
        res.status(200).json({success:false, message:'cant get products'})
    }
}

model.exports={FilteredProducts}