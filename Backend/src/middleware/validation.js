import { z } from 'zod'
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")

export const signUpSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain alphanumeric characters and underscores")
        .trim(),
    email: z.string().email("Invalid email format").trim().toLowerCase(),
    password: passwordSchema,
});

export const signInSchema = z.object({
    email: z.string().email("Invalid email format").trim().toLowerCase(),
    password: z.string().min(1, "Password is required"),
});


export const validateRequest = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        const validationErrors = error?.errors;
        if (Array.isArray(validationErrors)) {
            const formattedErrors = validationErrors.map((err) => ({
                field: err.path[0],
                message: err.message
            }))
            return res.status(400).json({
                status: 'fail',
                message: "Validation Error",
                errors: formattedErrors
            })
        }
        next(error);
    }
}