import express from 'express';

import { register,login,getProfile,updateProfile } from '../controllers/authController.js';
const router=express.Router();
import auth from '../middleware/auth.middleware.js';

router.post('/login',login);
router.post('/register',register);
router.get("/profile", auth, getProfile);

router.put("/profile", auth,updateProfile);



export default router; 
