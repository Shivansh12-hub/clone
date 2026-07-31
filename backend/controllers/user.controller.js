import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/post.model.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(401).json({
        message: "Please provide all the fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(401).json({
        message: "User already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registed successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please provide all the nessasory fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({
        message: "Wrong email or user do not exist, Please register first",
        success: false,
      });
    }

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      return res.status(402).json({
        message: "Wrong password , Please provide a correct password",
        success: false,
      });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
      const populatedPost = Promise.all(
          user.posts.map(async (postId) => {
              const post = await Post.findById(postId);
              if (post.auther.equals(user._id)) {
                  return post;
              }
              else {
                  return null;
              }
          })
      )
    user = {
      _id: user._id,
      userName: user.userName,
      email: email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPost,
    };


    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Successfully LogedIn user",
        success: true,
        user,
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId);
    return res.status(200).json({
      user,
      message: "successfully get profile",
      success: true,
    });
  } catch (error) {
    console.error(error);

      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};



export const editProfile = async (req, res) => {
  try {
    const profilePicture = req.file;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      
      // Upload the base64 dataUri string from Multer
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      
      console.log("Uploaded successfully:", cloudResponse.secure_url);
    }

    return res.status(200).json({ 
      success: true,
      message: "Profile updated successfully" 
    });

  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const suggestedUser = await User.find({ _id: { $ne: req.id } }).select(
      "-password",
    );

    if (!suggestedUser) {
      return res.status(400).josn({
        messaage: "Current there no other present",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      users: suggestedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const followOrUnfollow = async (req, res) => {
    try {
        const userFollowKarneVala = req.id; 
        const userJiskoFollowKia = req.params.id;

        // 1. Self-Follow Check
        if (userFollowKarneVala === userJiskoFollowKia) {
            return res.status(400).json({
                message: "You cannot follow or unfollow yourself",
                success: false
            });
        }

        // 2. Database Fetch
        const user = await User.findById(userFollowKarneVala);
        const targetUser = await User.findById(userJiskoFollowKia);

        // 3. Null Checks
        if (!user || !targetUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // 4. Logic Execution
        const isFollowing = user.following.includes(userJiskoFollowKia);

        if (isFollowing) {
            // Unfollow logic
            await Promise.all([
                User.updateOne({ _id: userFollowKarneVala }, { $pull: { following: userJiskoFollowKia } }),
                User.updateOne({ _id: userJiskoFollowKia }, { $pull: { followers: userFollowKarneVala } }),
            ]);

            return res.status(200).json({
                message: "Unfollowed successfully",
                success: true,
            });
        } else {
            // Follow logic
            await Promise.all([
                User.updateOne({ _id: userFollowKarneVala }, { $addToSet: { following: userJiskoFollowKia } }),
                User.updateOne({ _id: userJiskoFollowKia }, { $addToSet: { followers: userFollowKarneVala } }),
            ]);

            return res.status(200).json({
                message: "Followed successfully",
                success: true,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

