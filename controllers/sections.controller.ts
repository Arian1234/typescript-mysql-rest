import { Request, Response } from 'express';
import Sections from '../models/sections.model';

export const getSections = async(req: Request, res: Response) => {
    try {
        const section = await Sections.findAll();
        res.json({
            section
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}

export const getSection = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const section = await Sections.findByPk(id);
        if (section) {
            res.json({
                section
            })
        } else {
            res.status(404).json({
                msg: `No existe una section con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postSection = async(req: Request, res: Response) => {
    const section = req.body;

    try {
        if(await existeSection(req)){
            res.status(500).json({
                msg:"Los datos que intenta ingresar ya estan registrados en la base de datos."
            })
        }else{
            Sections.create(section).then(() => res.json({ msg: "Exito,acabas de registrar una nueva section." }))
            .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` })); 
        }
     } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putSection = async(req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const section = await Sections.findByPk(id);
        if (!section) {
            return res.status(404).json({ msg: `La section con codigo ${id} no existe.` });
        } else {
            if (await existeSection(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await section.update(body);
                return res.json({ body });
            }

        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}


async function existeSection(req: Request) {
    const { body } = req;
    const existeSect = await Sections.findOne({
        where: {
            nombsection: body.nombsection
        }
    });
    return existeSect ? true : false;
}