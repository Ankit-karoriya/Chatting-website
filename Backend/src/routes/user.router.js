import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
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

export default router;