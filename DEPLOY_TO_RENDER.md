# Portfolio Deployment - Step by Step

## ✅ Step 1: Push to GitHub (DO THIS FIRST)

1. **Open GitHub** and create a new repository:
   - Go to https://github.com/new
   - Name: `portfolio`
   - Make it **Public**
   - Don't initialize with README
   - Click **Create repository**

2. **Push your code** (run these commands):
```bash
cd c:\portfolio
git init
git add .
git commit -m "Portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/Vishal-25-cyber/portfolio.git
git push -u origin main
```

---

## ✅ Step 2: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Sign up/Login** (use GitHub to sign in)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect GitHub"** → Select your `portfolio` repository
5. **Configure the service**:
   - **Name**: `portfolio-backend`
   - **Region**: Choose closest to you
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Select **"Free"**

6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   EMAIL_USER = vishal250820@gmail.com
   EMAIL_PASSWORD = xypj zujs lzqe cptz
   MONGODB_URI = mongodb+srv://vishal250820:vishal250820@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   PORT = 5000
   ```

7. Click **"Create Web Service"**
8. **Wait 2-3 minutes** for deployment
9. **Copy your backend URL** (looks like: `https://portfolio-backend-xxxx.onrender.com`)

---

## ✅ Step 3: Update Frontend to Use Backend URL

**IMPORTANT**: Before deploying frontend, update the API URL!

Open `c:\portfolio\src\components\Contact.js` and find line ~41:

**Change from:**
```javascript
const response = await fetch('http://localhost:5000/api/contact', {
```

**Change to:**
```javascript
const response = await fetch('https://portfolio-backend-xxxx.onrender.com/api/contact', {
```
*(Replace `xxxx` with your actual backend URL)*

**Save the file** and commit:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

---

## ✅ Step 4: Deploy Frontend to Render

1. Go back to **Render Dashboard**
2. Click **"New +"** → **"Static Site"**
3. Select your `portfolio` repository again
4. **Configure**:
   - **Name**: `portfolio-frontend`
   - **Root Directory**: Leave **empty**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

5. Click **"Create Static Site"**
6. **Wait 3-5 minutes** for build and deployment

---

## ✅ Step 5: Test Your Live Portfolio!

1. **Visit your frontend URL**: `https://portfolio-frontend-xxxx.onrender.com`
2. **Test the contact form**:
   - Fill in your details
   - Click Submit
   - Check for success message
3. **Check your email**: `vishal250820@gmail.com`
4. **Check MongoDB**: Login to MongoDB Atlas to see the saved data

---

## 🎉 You're Live!

Your portfolio is now deployed and accessible worldwide!

**Share your link**: `https://portfolio-frontend-xxxx.onrender.com`

---

## ⚠️ Important Notes

**Free Tier Limitations**:
- Services sleep after 15 minutes of inactivity
- First visit after sleep takes 30-60 seconds to wake up
- This is normal for free tier!

**To keep it awake** (optional):
- Use a service like UptimeRobot to ping your site every 5 minutes
- Or upgrade to paid tier ($7/month per service)

---

## 🔧 Troubleshooting

**Backend not deploying?**
- Check Render logs for errors
- Verify environment variables are set correctly

**Frontend not connecting to backend?**
- Make sure you updated the API URL in Contact.js
- Check browser console for CORS errors

**Email not sending?**
- Verify EMAIL_PASSWORD is correct (no spaces)
- Check backend logs on Render

**Need help?** Check the full deployment guide or ask me!
