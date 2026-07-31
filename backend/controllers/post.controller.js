import sharp from "sharp"
import cloudinary from "../utils/cloudinary";
import Post from "../models/post.model";
import User from "../models/user.model";


export const addNewPost = async (req, res) => {
    try {

        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;


        if (!image) {
            return res.status(401).json({
                message: "Image required"
            });
        }

        const optimisedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();
        
        // buffer to data uri
        const fileUri = `data:image/jpeg;base64, ${optimizedImageBuffer.toString('base64')}`;

        const cloudResponce = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image,
            authorId
        });

        const user = await User.findById(authorId);

        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });

        return res.status(200).json({
            message: "New Post added",
            post,
            status:true,
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const getAllPost = async (req, res) => {
    try {
        const post = (await Post.find()).toSorted({ createdAt: -1 })
            .populate({ path: 'author', select: 'userName, profilePicture' })
        .populate({path:'comments', sort:{createdAt:-1}, })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}