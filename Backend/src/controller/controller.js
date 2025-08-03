import cloudinaryConfig from '../config/cloudinary.js'

export const uploaderController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file Uploaded" })
    }
    const filepath = req.file.path
    try {
        const imageUrl = await cloudinaryConfig(filepath);
        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.log("Error in uploaderController function: ", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
