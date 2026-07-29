import { Router } from "express";
import {
    editProfile,
    followOrUnfollow,
    getProfile,
    getSuggestedUser,
    login,
    logout,
    register
} from "../controllers/user.controller";

import isAuthenticated from "../middleware/isAuthenticated";
import upload from "../middleware/multer";

const router = Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(isAuthenticated,logout);
router.route('/:id/profile').get(isAuthenticated,getProfile);
router.route('/profile/edit').patch(isAuthenticated,upload.single('profilePicture'),editProfile);
router.route('/suggestedUser').get(isAuthenticated,getSuggestedUser);
router.route('followUnfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;