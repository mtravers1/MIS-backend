const Product = require('../../model/products')

const FilteredProducts= async(req,res)=>{
    try{
        let filers={}
        const products = await Product.find({});

        res.status(200).json({
          success: true,
          data: products,
        });
      } 
      catch (e) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Some error occured",
        });
    }
}
module.exports={FilteredProducts}