import User from '../models/user.js';
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt, cfgScale, steps, aspectRatio, sampler } = req.body;
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

        // Build enhanced prompt to steer stability diffusion based on user's custom settings
        let enhancedPrompt = prompt;

        // CFG Scale Influence
        if (cfgScale !== undefined) {
            const cfgVal = parseFloat(cfgScale);
            if (cfgVal > 10) {
                enhancedPrompt += ", high contrast, vibrant colors, intense detail, sharp outlines, cinematic pop";
            } else if (cfgVal < 5) {
                enhancedPrompt += ", soft focus, pastel tones, ethereal atmosphere, dreamlike lighting, painting";
            }
        }

        // Inference Steps Influence
        if (steps !== undefined) {
            const stepsVal = parseInt(steps);
            if (stepsVal > 60) {
                enhancedPrompt += ", hyper-realistic, intricate fine details, extremely detailed textures, octane render, 8k resolution";
            } else if (stepsVal > 30) {
                enhancedPrompt += ", highly detailed, crisp rendering, sharp focus";
            }
        }

        // Sampler Influence
        if (sampler) {
            if (sampler === "Euler a") {
                enhancedPrompt += ", smooth gradients, clean digital art styling, cohesive visual structure";
            } else if (sampler === "DPM++ 2M SDE") {
                enhancedPrompt += ", raw photography look, film grain texture, volumetric dust rays, detailed shading, professional capture";
            } else if (sampler === "DDIM") {
                enhancedPrompt += ", retro illustrations, classic cell shading, clean flat surfaces";
            } else if (sampler === "Heun") {
                enhancedPrompt += ", painterly fine art, oil canvas texture, rich light depth, classical painting style";
            }
        }

        console.log(`[GEN_API] User: ${user.username} | Base Prompt: "${prompt}" | Enhanced Prompt: "${enhancedPrompt}" | CFG: ${cfgScale} | Steps: ${steps} | Sampler: ${sampler} | AspectRatio: ${aspectRatio}`);

        // Prepare request to ClipDrop API
        const formData = new FormData();
        formData.append('prompt', enhancedPrompt);

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
