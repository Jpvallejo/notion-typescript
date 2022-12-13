/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { getDatabase } from '../../modules/notion';


/**
 * Router Definition
 */
export const ccAccountsRouter = express.Router();

/**
 *  Service Definition
 */

/**
 * Controller Definitions
 */

// // GET :userId

ccAccountsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const creditCard = req.query.card;
        const month = req.query.month;
        const accounts = await getDatabase(creditCard as string, month as string);

        res.status(200).send(accounts);
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

ccAccountsRouter.get("/sum", async (req: Request, res: Response) => {
    try {
        const creditCard = req.query.card;
        const month = req.query.month;
        const accounts = await getDatabase(creditCard as string, month as string);
        const ars = accounts.filter(x => x.moneda === "ARS").reduce((partialSum, a) => partialSum + a.monto, 0);
        const usd = accounts.filter(x => x.moneda === "USD").reduce((partialSum, a) => partialSum + a.monto, 0);

        res.status(200).send({ ars, usd });
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});
