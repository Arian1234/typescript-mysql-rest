import { validationResult } from "express-validator";
import { Request, Response } from "express";

const validatorCatalog = (req: Request, res: Response, next:any) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(
            error.array()
        )
    }
next();

}

export default validatorCatalog;