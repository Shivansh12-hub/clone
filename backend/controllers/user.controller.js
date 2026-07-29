import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt"
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(401).json({
                message: "Please provide all the fields",
                success: false
            });
        }

        const user = User.findOne({ email });

        if (user) {
            return res.status(401).json({
                message: "User already exist",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).josn({
            message: "User registed successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


export const login = async () => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(401).json({
                message: "Please provide all the nessasory fields",
                success: false
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(402).json({
                message: "Wrong email or user do not exist, Please register first",
                success: false
            });
        }
    
        const verified = await bcrypt.compare(password, user.password);
    
        if (!verified) {
            return res.status(402).json({
                message: "Wrong password , Please provide a correct password",
                success: false,
            });
        }

        user = {
            _id: user._id,
            userName: user.userName,
            email: email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts:user.posts
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).josn({
            message: "Successfully LogedIn user",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    };

}


export const logout = async (__dirname, res)=>{
    try {
        return res.cookie('token', "", { maxAge: 0 }).json({
            message: 'Logged out successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user,
            message: "successfully get profile",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const editProfile = async (req, res) => {
    try {
        const userId = req.userId;
        let cloudResponce;
        
        const { bio, gender } = req.body;
        const profilePicture = req.file;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponce = await cloudinary.uploader.upload(fileUri);
        }

        const user = User.findById(userId);

        if (!user) {
            return res.status(402).json({
                message: "User not found",
                success:false
            })
        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponce.secure_rul;

        await user.save();

        return res.status(200).json({
            message: "Profile successfully updated",
            success: true,
            user
        })


    } catch (error) {
        console.log(error);
    }
}


export const getSuggestedUser = async (req, res) => {
    try {
        const suggestedUser = await User.find({ _id: { $ne: req.id } }).select("-password");

        if (!suggestedUser) {
            return res.status(400).josn({
                messaage: "Current there no other present",
                success:false
            })
        };

        return res.status(200).josn({
            success: true,
            users:suggestedUser
        })

    } catch (error) {
        console.log(error);
    }
}


export const followOrUnfollow = async (req, res)=> {
    try {
        const userFollowKarneVala = req.id;
        const userJiskoFollowKia = req.params.id;
        if (userFollowKarneVala === userJiskoFollowKia) {
            return res.status(401).json({
                message: "Cant follow yourself",
                success:false
            })
        }

        const user = await user.findById(userFollowKarneVala);
        const targetUser = await user.findById(userJiskoFollowKia);

        if (!user) {
            return res.status(401).josn({
                messaeg: "User not found or session expired",
                
                success:false,
            })
        }

        if (!targetUser) {
            return res.status(401).josn({
                messaeg: "User not found.",
                success: false,
            });
        }

        const checkFollowing = user.following.includes(userJiskoFollowKia);  // it will return ki ye jisko follow karna h vo already exist karta hai kya agar ha toh to unfollow ka logic agar nhi toh follow ka

        if (checkFollowing) {
            // unfollow logic
            await Promise.all([
                user.updateOne({ _id: userFollowKarneVala }, { $push: { following: userJiskoFollowKia } }),
                targetUser.updateOne({ _id: userJiskoFollowKia }, { $push: { followers: userFollowKarneVala } }),
            ]);

            return res.status(200).josn({
                message: "Unfollow successfully",
                success: true
            });
        }
        else {
            // follow logic
            await Promise.all([
                user.updateOne({ _id: userFollowKarneVala }, { $push: { following: userJiskoFollowKia } }),
                targetUser.updateOne({ _id: userJiskoFollowKia }, { $push: { followers: userFollowKarneVala } }),
            ]);

            return res.status(200).josn({
                message: "Follow successFully",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
    }
}