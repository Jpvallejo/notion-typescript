/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { getDatabase, createEntry } from '../../modules/notion';
import { getCaptcha } from "../services/captchaService";


/**
 * Router Definition
 */
export const captcha = express.Router();

/**
 *  Service Definition
 */

/**
 * Controller Definitions
 */

// // GET :userId

captcha.post("/", async (req: Request, res: Response) => {
    try {
        const audio = req.body.string;
        console.log(audio);

        const response = await getCaptcha(audio);
        console.log(response);
        res.status(200).send({"captcha" :response});
    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

