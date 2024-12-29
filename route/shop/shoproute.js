const express=require("express")
const {handleImageUpload, addProduct, getAllProducts, deleteProduct, editProduct}=require("../../controllers/admin/products-controller")
const {upload}=require('../../helpers/cloudinary')
const router = express.Router()
const {FilteredProducts} = require('../../controllers/shop/controller')

router.get('/get', FilteredProducts)
// router.get('/get', ()=>{
//     console.log("working")
// })
// router.post('/upload-image', upload.single('my_file'), handleImageUpload)
// router.post('/add', addProduct)
// router.get('/get', getAllProducts)
// router.put('/edit/:id', editProduct)
// router.delete('/delete/:id', deleteProduct)
module.exports=router