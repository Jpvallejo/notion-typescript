/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { getDatabase, createEntry } from '../../modules/notion';
import upload from "../middleware/FileConfig";
import { Readable } from 'stream'
import { GoogleDriveService } from "../services/googleDriveService";
import dotenv from "dotenv";


dotenv.config();
const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

/**
 * Router Definition
 */
export const uploadFileRouter = express.Router();

/**
 *  Service Definition
 */
const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

/**
 * Controller Definitions
 */

// // POST

uploadFileRouter.post("/expensas", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const file = req.file && req.file.buffer;
        let folder = await googleDriveService.searchFolder('Expensas').catch((error) => {
            console.error(error);
            throw error;
        });
        await googleDriveService.saveFile(`Expensas-${month}-${year}`, file, 'application/pdf', folder?.id).catch((error: any) => {
            console.error(error);
        });

        res.status(200).send('File uploaded successfully!');

    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

uploadFileRouter.post("/alquiler", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const file = req.file && req.file.buffer;
        let folder = await googleDriveService.searchFolder('Alquiler').catch((error) => {
            console.error(error);
            throw error;
        });
        await googleDriveService.saveFile(`Alquiler-${month}-${year}`, file, 'application/pdf', folder?.id).catch((error: any) => {
            console.error(error);
        });

        res.status(200).send('File uploaded successfully!');

    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

uploadFileRouter.post("/cochera", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const file = req.file && req.file.buffer;
        let folder = await googleDriveService.searchFolder('Cochera').catch((error) => {
            console.error(error);
            throw error;
        });
        await googleDriveService.saveFile(`Cochera-${month}-${year}`, file, 'application/pdf', folder?.id).catch((error: any) => {
            console.error(error);
        });

        res.status(200).send('File uploaded successfully!');

    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

uploadFileRouter.post("/metrogas", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const file = req.file && req.file.buffer;
        let folder = await googleDriveService.searchFolder('Metrogas').catch((error) => {
            console.error(error);
            throw error;
        });
        await googleDriveService.saveFile(`Metrogas-${month}-${year}`, file, 'application/pdf', folder?.id).catch((error: any) => {
            console.error(error);
        });

        res.status(200).send('File uploaded successfully!');

    } catch (e: any) {
        res.status(404).send(e.message);
    }
});

uploadFileRouter.post("/edenor", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const file = req.file && req.file.buffer;
        let folder = await googleDriveService.searchFolder('Edenor').catch((error) => {
            console.error(error);
            throw error;
        });
        await googleDriveService.saveFile(`Edenor-${month}-${year}`, file, 'application/pdf', folder?.id).catch((error: any) => {
            console.error(error);
        });

        res.status(200).send('File uploaded successfully!');

    } catch (e: any) {
        res.status(404).send(e.message);
    }
});


