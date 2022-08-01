import { Response, Request } from 'express';
import Catalogs from '../models/catalogs.model';


export const getCatalogs = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalogs.findAll();
        res.json({
            catalog
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};

export const getCatalog = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const catalog = await Catalogs.findByPk(id);
        if (catalog) {
            res.json({
                catalog
            })
        } else {
            res.status(404).json({
                msg: `No existe un catalog con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};

export const postCatalog = async(req: Request, res: Response) => {
    const catalog = req.body;

    try {
        if(await existeCatalog(req)){
            res.status(500).json({
                msg:"Los datos (catalog) que intenta ingresar ya estan registrados en la base de datos."
            })
        }else{
            Catalogs.create(catalog).then(() => res.json({ msg: "Exito,acabas de registrar un nuevo catalog." }))
            .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` })); 
        }
     } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};


export const putCatalog = async(req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const catalog = await Catalogs.findByPk(id);
        if (!catalog) {
            return res.status(404).json({ msg: `El catalog con codigo ${id} no existe.` });
        } else {
           
            if (await existeCatalog(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await catalog.update(body);
                return res.json({ body });
            }
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};
export const deleteCatalog = async(req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const catalog = await Catalogs.findByPk(id);
        if (!catalog) {
            return res.status(404).json({ msg: `El catalog con codigo ${id} no existe.` });
        } else {
            await catalog.update({ estcatalog: '0' });
            return res.json({ msg: `El catalog ${body.prodcatalog} con Id : ${id} a sido dado de baja.` });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};

async function existeCatalog(req: Request) {
    const { body } = req;
    const existeCatalog = await Catalogs.findOne({
        where: {
            prodcatalog: body.prodcatalog
        }
    });
    return existeCatalog ? true : false;
}