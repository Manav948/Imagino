import User from '../models/user.js';
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        if (!userId || !prompt) {
            return res.status(400).json({ message: "Missing userId or prompt" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.imageCount >= user.maxImageLimit) {
            return res.status(403).json({ message: "You have reached your image generation limit." });
        }

        // Prepare request to ClipDrop API
        const formData = new FormData();
        formData.append('prompt', prompt);

        const clipdropResponse = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API_KEY
                },
                responseType: 'arraybuffer'  
            }
        );

        const base64Image = Buffer.from(clipdropResponse.data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Update user's image count
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $inc: { imageCount: 1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Image generated successfully",
            imageCount: updatedUser.imageCount,
            resultImage
        });

    } catch (error) {
        console.error("Error in generateImage:", error?.response?.data || error.message || error);
        return res.status(500).json({ message: "Image generation failed, please try again later." });
    }
};
