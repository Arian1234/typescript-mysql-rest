import { Request, Response } from 'express';
import categories from '../models/categories.model';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categ = await categories.findAll();
        res.json({
            categ
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}

export const getCategory = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const categ = await categories.findByPk(id);
        if (categ) {
            res.json({
                categ
            })
        } else {
            res.status(404).json({
                msg: `No existe una categ con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postCategory = async (req: Request, res: Response) => {

    const categ = req.body;
    try {
        if (await existeCategory(req)) {
            res.status(500).json({
                msg: "Los datos que intenta ingresar ya estan registrados en la base de datos."
            })
        } else {
            categories.create(categ).then(() => res.json({ msg: "Exito,acabas de registrar una nueva categ." }))
                .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const categ = await categories.findByPk(id);
        if (!categ) {
            return res.status(404).json({ msg: `La categ con codigo ${id} no existe.` });
        } else {
            if (await existeCategory(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await categ.update(body);
                return res.json({ body });
            }

        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}


async function existeCategory(req: Request) {
    const { body } = req;
    const existeSect = await categories.findOne({
        where: {
            nombcategory: body.nombcategory
        }
    });
    return existeSect ? true : false;
}