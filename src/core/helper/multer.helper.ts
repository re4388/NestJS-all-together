import { Request } from 'express';
import { join } from 'path';

export class MulterHelper {

    public static destination(
        request: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ): void {
        callback(null, join(__dirname, '../../../upload/'));
        // callback(null, './upload');
    }

    public static filenameHandler(
        request: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ): void {
        const { originalname } = file;
        const timestamp = new Date().toISOString();
        callback(null, `${timestamp}-${originalname}`);
    }

}