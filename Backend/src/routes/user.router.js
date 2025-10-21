import { Router } from 'express';
import { login, registerUser, logout } from '../controllers/user.controller.js';
import { upload } from '../utils/multer.js'

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route('/login').post(login)
router.route('/logout').post(logout)


export default router;