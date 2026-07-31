import sharp from "sharp"
import cloudinary from "../utils/cloudinary";
import Post from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";


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
        const posts = await Post.find().toSorted({ createdAt: -1 })
            .populate({ path: 'author', select: 'userName, profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: ({
                    path: 'author',
                    select:'userName, profilePicture'
                })
            })
        
        return res.status(200).json({
            success: true,
            posts,
            message:"Post successfully fetched",
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const getUserPOst = async (req, res) => {
    try {
        const authorId = req.id;

        const posts = await Post.find({ author: authorId })
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'userName, profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: ({
                    path: 'author',
                    select:'userName, profilePicture'
                })
            })
        
        return res.status(200).json({
            success: true,
            posts,
            message:"Post successfully fetched",
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const likePost = async (req, res) => {
    try {
        const likeKarneValaUser = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(400).json({
                success: false,
                message:"post not found"
            })
        }

        // like post logic
        await post.updateOne({ $addToSet: { likes: likeKarneValaUser } });
        await post.save();

        // implement socket.io for real time notification



        return res.status(200).json({
            message: "Post Liked",
            success:true
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}




export const disLikePost = async (req, res) => {
    try {
        const disLikeKarneValaUser = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(400).json({
                success: false,
                message:"post not found"
            })
        }

        // unlike post logic
        await post.updateOne({ $pull: { likes: likeKarneValaUser } });
        await post.save();

        // implement socket.io for real time notification



        return res.status(200).json({
            message: "Post unLiked",
            success:true
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentKarneValekiId = req.id

        const { text } = req.body;
        if (!text) {
            return res.status(400).json({
                message: "Text is required",
                success: false
            });
        }
        const post = Post.findById(postId);

        const comment = await Comment.create({
            text,
            author: commentKarneValekiId,
            post: postId
        })
            .populate({ path: 'author', select: "userName, profilePicture" });
        
        post.comment.push(comment._id);
        await post.save();

        return res.status(200).json({
            message: "Comment Added",
            comment,
            success:true
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}