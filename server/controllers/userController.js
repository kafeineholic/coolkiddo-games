import userModel from "../models/usermodel.js";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const getUserData = async (req,res) => {
 try {

    const {userId} = req.body;
//
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    const user = await userModel.findById(userId);

    if(!user){
        return  res.json({success:false , message: 'User not found'});
    }
    res.json({
        success:true,
        userData:{
            _id: user._id,
            fullName: user.fullName,
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            password: user.password,
            coins: user.coins,
            claimedDays: user.claimedDays,
        }
     });

 } catch (error) {
    res.json({success:false , message: error.message});
 }
}


// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.body.userId; 

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    try {
        const updates = { name, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile.', error: error.message });
    }
};




// Controller to get user coins
export const getUserCoins = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("User ID received:", userId);

        // Validate User ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID format" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            console.log(`User not found with ID: ${userId}`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log(`User found: ${user.name}, Coins: ${user.coins}`);
        res.status(200).json({ success: true, coins: user.coins });
    } catch (error) {
        console.error("Error fetching user coins:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const claimCoinForDay = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentDate = new Date();
        const currentDay = currentDate.getDay();  

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.claimedDays[currentDay]) {
            return res.status(400).json({ success: false, message: "You have already claimed your coin for today." });
        }

        user.coins += 1;
        user.claimedDays[currentDay] = true;  
        await user.save();

        res.status(200).json({ success: true, coins: user.coins, claimedDays: user.claimedDays });  // Include claimedDays in the response
    } catch (error) {
        console.error("Error claiming coin:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
