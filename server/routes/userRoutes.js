import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, updateUserProfile } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/data', userAuth , getUserData)
userRouter.put('/update-profile', userAuth, updateUserProfile);
userRouter.put('/update-coins', userAuth, updateUserCoins);


export default userRouter;

