import { Request,Response } from "express"
import Images from '../models/images.model'

export const getImages=(req:Request,res:Response)=>{
const images=Images.findAll();
res.json( {
    images
})

}
export const getImage=(req:Request,res:Response)=>{

}
export const postimage=(req:Request,res:Response)=>{

}
export const putImage=(req:Request,res:Response)=>{

}
export const deleteImage=(req:Request,res:Response)=>{

}