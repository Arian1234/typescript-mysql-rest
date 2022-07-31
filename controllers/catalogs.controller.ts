import { Response, Request } from 'express';
import Catalogs from '../models/catalogs.model';


export const getCatalogs=(req:Request,res:Response)=>{
    const catalogo=Catalogs.findAll();
    res.json({
        catalogo
    })
};
export const getCatalog=(req:Request,res:Response)=>{
    
};
export const postCatalog=(req:Request,res:Response)=>{
    
};
export const putCatalog=(req:Request,res:Response)=>{
    
};
export const deleteCatalog=(req:Request,res:Response)=>{
    
};