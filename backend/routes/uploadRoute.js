import express from 'express'
import multer from 'multer'
import path from 'path'
import {protect,admin} from '../middleware/authMiddleware.js'
const router =  express.Router()
import pkg from 'cloudinary'
const cloudinary = pkg

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'upload/')//no error , where we want to upload
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)//.extname is to get file extension
    }
})

function checkFileType(file,cb){ //make sure it is image
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())//test return true or false
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){ 
        return cb(null, true)
    }else{
        cb('image only')
    }
}
const upload = multer({
    storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/',protect, admin ,upload.single('image'),async (req,res) =>{
    const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`,{folder:'Proshop'})
    res.send(uploadPhoto.url) // This is what we want to send back now in the  res.send
})
export default router
