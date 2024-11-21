const {imageUploadUtil} = require('../../helpers/cloudinary')
const Products = require( '../../model/products' )

const handleImageUpload = async(req, res)=>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype+";base64,"+b64
        const result = await imageUploadUtil(url)
        res.json({
            success:true,
           result
        })
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:'error occured'})
    }
}

//add new products
const addProduct = async(req,res)=>{
    try{
        const {image, title, description, category, brand, price, saleprice, totalstock}=req.body
        const newlyCreatedProduct = new Products({image, title, description, category, brand, price, saleprice, totalstock})
        await newlyCreatedProduct.save()
        res.status(201).json({
            success:true,
            message:'successfully added'
        })
    }
    catch(e){
        console.log(e)
        res.json({success:false, message:'error occured'})
    }
}


//fetch all products
const getAllProducts= async(req,res)=>{
    try{
        const listOfProducts = await Products.find({})
        res.status(201).json({success:true, data:listOfProducts})

    }catch(e){
        console.log(e)
    }
}

//edit a product
const editProduct = async(req, res)=>{
    try{
        const {id}=req.params
        const {image, title, description, category, brand, price, saleprice, totalstock}=req.body
        const findProduct =await Products.findById(id)
        if(!findProduct){
            res.json({success:false, message:'product not found'})
        }

        findProduct.title=title || findProduct.title
        findProduct.description=description || findProduct.description
        findProduct.category=category || findProduct.category
        findProduct.brand=brand || findProduct.brand
        findProduct.price=price || findProduct.price
        findProduct.salePrice=saleprice || findProduct.salePrice
        findProduct.image=image || findProduct.image
        await findProduct.save()
        res.status(200).json({success:true, data:findProduct})

    }catch(e){
        console.log(e)
    }
}


//delete a product

const deleteProduct = async(req, res)=>{
    try{
        const {id}=req.params
        const product= await Products.findByIdAndUpdate(id)
    if(!product){
        res.status(404).json({success:false, message:'product not found'})
    }
    res.status(200).json({success:true, message:'producte deleted succesfully'})
    }catch(e){
        console.log(e)
    }
}


module.exports = {handleImageUpload, getAllProducts, editProduct, addProduct, deleteProduct}