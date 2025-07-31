import User from '../models/user.js'
const Max_Free_imageGeneration = 10;
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUser function : ", error);
        return res.status(500).json({ message: "Internal server Error" })
    }
}

export const canGenerateImage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.generatedImages.length >= Max_Free_imageGeneration) {
            return res.status(403).json({ message: "Max Limit Reached" });
        }
        res.status(200).json({ message: "allowed" });
    } catch (error) {
        console.log("error in GenerateImage function : ", error);
        res.status(500).json({ message: "Internal server error " })
    }
}

export const storeImage = async (req, res) => {
    const { prompt, imageUrl } = req.body
    try {
        const user = await User.findById(req.user.id);
        user.generatedImages.push({ prompt, imageUrl });
        await user.save();
        res.status(200).json({ message: "save" })
    } catch (error) {
        console.log("Error in storeImage function : ", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
}

export const getImage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ images: user.generatedImages })
    } catch (error) {
        console.log("Error in getImage Function : ", error);
        return res.status(500).json({ message: "Internal server Error" });
    }
}