import { Request, Response } from "express"
import Images from '../models/images.model'
import { Op } from "sequelize";

export const getImages = async (req: Request, res: Response) => {
    try {
        const image = await Images.findAll();
        res.json({
            image
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const getImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const image = await Images.findByPk(id);
        if (image) {
            res.json({
                image
            })
        } else {
            res.status(404).json({
                msg: `No existe una image con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postimage = async (req: Request, res: Response) => {
    const image = req.body;

    try {
        if (await url_catalogid_unique(req)) {
            res.status(500).json({
                msg: "Los datos que intenta ingresar ya estan registrados en la base de datos."
            });
        } else {
            Images.create(image).then(() => res.json({ msg: "Exito,acabas de registrar una nueva image." }))
                .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));

        }


    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putImage = async (req: Request, res: Response) => {

    const { id } = req.params;
    const body = req.body;

    try {
        const image = await Images.findByPk(id);
        if (!image) {
            return res.status(404).json({ msg: `La image con codigo ${id} no existe.` });
        } else {
            if (await url_catalogid_unique(req)) {
                res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await image.update(body);
                return res.json({ body });
            }

        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const image = await Images.findByPk(id);
        if (!image) {
            return res.status(404).json({ msg: `El image con codigo ${id} no existe.` });
        } 
            await image.destroy();
            return res.json({ msg: `El image con Id : ${id} a sido eliminado.` });
        
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}

async function url_catalogid_unique(req: Request) {
    const { body } = req;
    const existeURL_catalog = await Images.findOne({
        where: {
            [Op.and]: [{ urlimage: body.urlimage }, { CATALOGId: body.CATALOGId }]
        }
    });
    return existeURL_catalog ? true : false;
}