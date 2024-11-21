const cloudinary= require('cloudinary').v2
const multer= require('multer')

cloudinary.config({
    cloud_name:'sd',
    api_key:'934851839373123',
    api_secret:'LrAlC0oS5mC8harKyAAE7RKveoQ'

}
)

const storage = new multer.memoryStorage()

async function imageUploadUtil(file){
    const result= await cloudinary.uploader.upload(file, {
        resource_type:'auto'
    })
    return result
}

const upload = multer({storage})

module.exports={upload, imageUploadUtil}