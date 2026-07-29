import { v1 as cloudinary } from 'cloudinary'

import { dotenv } from 'dotenv'

dotenv.config({});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_CLOUDNAME,
});

export default cloudinary;