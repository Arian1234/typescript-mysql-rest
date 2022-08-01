import { Request, Response } from 'express';
import Descriptions from '../models/descriptions.model';

export const getDescriptions = async (req: Request, res: Response) => {
    try {
        const description = await Descriptions.findAll();
        res.json({
            description
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const getDescription = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const description = await Descriptions.findByPk(id);
        if (description) {
            res.json({
                description
            })
        } else {
            res.status(404).json({
                msg: `No existe una description con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postDescription =async (req: Request, res: Response) => {
    const description = req.body;

    try {
        if(await existeDescription(req)){
            res.status(500).json({
                msg:"Los datos que intenta ingresar ya estan registrados en la base de datos."
            })
        }else{
            Descriptions.create(description).then(() => res.json({ msg: "Exito,acabas de registrar una nueva description." }))
            .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` })); 
        }
     } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putDescription = async(req: Request, res: Response) => {

    const { id } = req.params;
    const body = req.body;

    try {
        const description = await Descriptions.findByPk(id);
        if (!description) {
            return res.status(404).json({ msg: `La description con codigo ${id} no existe.` });
        } else {
            if (await existeDescription(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await description.update(body);
                return res.json({ body });
            }
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}

async function existeDescription(req: Request) {
    const { body } = req;
    const existeDescription = await Descriptions.findOne({
        where: {
            titulodescrip: body.titulodescrip
        }
    });
    return existeDescription ? true : false;
}