import express from 'express'
import { signup,login,me } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/authmiddleware.js';

const router=express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.get('/me',verifyToken,me)
export default router;