# Render Deployment - Manual Method

## ✅ WORKING SOLUTION - Follow These Exact Steps:

### Step 1: Delete render.yaml (Already Done)

### Step 2: Create New Web Service on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub: `Vishal-25-cyber/portfolio`

### Step 3: Configure EXACTLY Like This:

```
Name: portfolio-backend
Region: (Choose any)
Branch: main
Root Directory: (LEAVE COMPLETELY EMPTY - DO NOT TYPE ANYTHING)
Runtime: Node
Build Command: cd server && npm install
Start Command: cd server && node server.js
Instance Type: Free
```

### Step 4: Add Environment Variables

Click "Advanced" and add these 4 variables:

```
EMAIL_USER=vishal250820@gmail.com
EMAIL_PASSWORD=xypj zujs lzqe cptz
MONGODB_URI=mongodb+srv://vishal250820:vishal250820@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
```

### Step 5: Deploy

Click **"Create Web Service"**

---

## ⚠️ CRITICAL SETTINGS:

- **Root Directory**: MUST be EMPTY (blank field)
- **Build Command**: MUST be `cd server && npm install`
- **Start Command**: MUST be `cd server && node server.js`

These commands tell Render to:
1. Change directory INTO the server folder
2. Install dependencies there
3. Run server.js from there

---

## 🎯 This Will Work Because:

- No render.yaml to confuse Render
- Explicit `cd server` commands
- No ambiguity about paths

---

**After deployment succeeds, copy your backend URL!**
