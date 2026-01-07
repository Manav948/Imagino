# 🚀 Render Deployment Guide

This guide will help you deploy the Imagino backend to Render.

## Prerequisites

- A Render account ([sign up here](https://render.com))
- MongoDB database (MongoDB Atlas recommended)
- Cloudinary account (for image storage)
- ClipDrop API key (for AI image generation)

## Deployment Steps

### Option 1: Deploy using render.yaml (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render**
   - Go to your Render dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   In the Render dashboard, add the following environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string for JWT token signing
   - `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
   - `CLIPDROP_API_KEY` - Your ClipDrop API key
   - `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend.vercel.app`)

4. **Deploy**
   - Render will automatically build and deploy your service
   - The deployment URL will be provided after successful deployment

### Option 2: Manual Deployment

1. **Create a new Web Service**
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `imagino-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `Backend`

3. **Add Environment Variables**
   Use the same environment variables as listed in Option 1.

4. **Deploy**
   Click "Create Web Service" and wait for deployment.

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (auto-set by Render, defaults to 5000) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `CLIPDROP_API_KEY` | ClipDrop API key for image generation | Yes |
| `FRONTEND_URL` | Frontend URL for CORS (update after frontend deployment) | Yes |

## Important Notes

- **CORS Configuration**: Update `FRONTEND_URL` in environment variables after deploying your frontend
- **Database**: Ensure your MongoDB database is accessible from Render's servers (whitelist Render IPs if needed)
- **Free Tier**: Render's free tier spins down after 15 minutes of inactivity. The first request may take longer to respond.
- **Logs**: Check Render dashboard logs if deployment fails

## Testing the Deployment

After deployment, test your API endpoints:

```bash
# Health check (adjust URL to your Render URL)
curl https://your-backend.onrender.com/api/auth/
```

## Troubleshooting

1. **Build fails**: Check that all dependencies are listed in `package.json`
2. **Server crashes**: Check environment variables are correctly set
3. **Database connection fails**: Verify `MONGO_URI` is correct and database is accessible
4. **CORS errors**: Ensure `FRONTEND_URL` matches your frontend deployment URL exactly

## Updating Your Frontend

After deploying the backend, update your frontend's API URL to point to your Render backend URL.

---

Need help? Check [Render's documentation](https://render.com/docs) or your service logs in the Render dashboard.

