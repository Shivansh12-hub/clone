import { Router } from "express";


import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import {
    addComment,
    addNewPost,
    bookMarkPost,
    deletePost,
    disLikePost,
    getAllPost,
    getCommentsOfPost,
    getUserPost,
    likePost
} from "../controllers/post.controller.js";

const router = Router();


router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost);
router.route('/allll').get(isAuthenticated,  getAllPost);
router.route('/userpost/all').get(isAuthenticated, getUserPost);
router.route('/:id/like').get(isAuthenticated, likePost);
router.route('/:id/dislike').get(isAuthenticated,  disLikePost);
router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').post(isAuthenticated, getCommentsOfPost);
router.route('/delete/:id').post(isAuthenticated, deletePost);
router.route('/:id/bookmark').post(isAuthenticated, bookMarkPost);



export default router;