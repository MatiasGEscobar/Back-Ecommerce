import { UploadApiResponse, v2 } from "cloudinary";
import toStream = require("buffer-to-stream");
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CloudinaryRepository{
    constructor(@Inject('CLOUDINARY') private cloudinary) {}

   async uploadToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            toStream(file.buffer).pipe(upload);
        });
    }
}