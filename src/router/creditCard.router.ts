/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { getDatabase, createEntry, getAllRecords } from '../../modules/notion';


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
        const ars = accounts.filter((x: { moneda: string; }) => x.moneda === "ARS").reduce((partialSum: any, a: { monto: any; }) => partialSum + a.monto, 0);
        const usd = accounts.filter((x: { moneda: string; }) => x.moneda === "USD").reduce((partialSum: any, a: { monto: any; }) => partialSum + a.monto, 0);

        res.status(200).send({ ars, usd });
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

ccAccountsRouter.get("/category", async (req: Request, res: Response) => {
    try {
        const month = req.query.month;
        const dolar = parseFloat(req.query.dolar as string);
        const accounts = await getAllRecords(month as string);

        const map = new Map<string, number>();
        let sum = 0;
        accounts.map((x) => {
            const newAmount = x.moneda === "USD"? parseFloat(x.monto)* dolar : parseFloat(x.monto)
            const amount = map.get(x.categoria);
            sum += newAmount
            if (!amount) {
                map.set(x.categoria, newAmount);
            } else {
                map.set(x.categoria, amount + newAmount)
            }
        })
        const percMap: any[] = [];
        map.forEach((value,key) => {
            var obj: any = {};
            obj[key] = value
            percMap.push(obj);
        })
        res.status(200).send({categories: percMap});
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

ccAccountsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const entry = req.body;
        const response = await createEntry(entry);

        res.status(200).send(response);
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});