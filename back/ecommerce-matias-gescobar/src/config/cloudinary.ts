import { v2 } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env'})

export const CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return v2.config({
            cloud_name: process.env.CCLOUDINARY_CLOUD_NAME,
            api_key:    process.env.CLOUDINARY_API_KEYimport,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
}