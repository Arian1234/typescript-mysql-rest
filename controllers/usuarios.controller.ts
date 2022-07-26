import { Request,Response } from "express"

export const getUsuarios=(req:Request,res:Response)=>{
res.json({
    msg:'getUsuarios'
})
}
export const getUsuario=(req:Request,res:Response)=>{
    const {id}=req.params;
res.json({
    msg:'getUsuario por id',
    id
})
};
export const postUsuarios=(req:Request,res:Response)=>{
const { body }=req;
    res.json({
    msg:'postUsuarioss',
    body
})
};
export const putUsuarios=(req:Request,res:Response)=>{
const {id}=req.params;
    res.json({
    msg:'putUsuarios',
    id
})
};
export const deleteUsuarios=(req:Request,res:Response)=>{
const {id}=req.params;
    res.json({
    msg:'deleteUsuarios',
    id
})
}