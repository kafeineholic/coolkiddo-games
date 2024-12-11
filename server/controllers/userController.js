import userModel from "../models/usermodel.js";
import bcrypt from 'bcryptjs';


export const getUserData = async (req,res) => {
 try {

    const {userId} = req.body;

    const user = await userModel.findById(userId);

    if(!user){
        return  res.json({success:false , message: 'User not found'});
    }
    res.json({
        success:true,
        userData:{
            fullName: user.fullName,
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            password: user.password
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

//Update User's Coin 
export const updateUserCoins = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.coins += 1; 
        await user.save();

        res.status(200).json({ message: "Coins updated successfully", coins: user.coins });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};