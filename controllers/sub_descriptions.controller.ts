import { Request, Response } from "express";
import Sub_descriptions from '../models/sub_description.model';


export const getSubDescriptions = async (req: Request, res: Response) => {
    try {
        const sub = await Sub_descriptions.findAll();
        res.json({
            sub
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const getSubDescription = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const sub = await Sub_descriptions.findByPk(id);
        if (sub) {
            res.json({
                sub
            })
        } else {
            res.status(404).json({
                msg: `No existe un sub_descriptión con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postSubDescription = (req: Request, res: Response) => {
    const sub = req.body;

    try {
        Sub_descriptions.create(sub).then(() => res.json({ msg: "Exito,acabas de registrar una nueva sub-description." }))
            .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));   // Store hash in your password DB.

    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putSubDescription = (req: Request, res: Response) => {

}
export const deleteSubDescription = (req: Request, res: Response) => {

}

