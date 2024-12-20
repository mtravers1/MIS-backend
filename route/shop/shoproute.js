const express=require("express")
const {handleImageUpload, addProduct, getAllProducts, deleteProduct, editProduct}=require("../../controllers/admin/products-controller")
const {upload}=require('../../helpers/cloudinary')
const router = express.Router()
const FilterProduct = require('../../controllers/shop/controller')

router.get('/get', FilterProduct)
// router.post('/upload-image', upload.single('my_file'), handleImageUpload)
// router.post('/add', addProduct)
// router.get('/get', getAllProducts)
// router.put('/edit/:id', editProduct)
// router.delete('/delete/:id', deleteProduct)
module.exports=router