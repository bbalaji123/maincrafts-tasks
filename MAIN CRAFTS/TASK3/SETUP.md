# 📖 Setup Guide - Advanced MERN Task Manager

Complete step-by-step instructions to set up and run the application locally.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the API](#testing-the-api)
7. [Common Issues](#common-issues)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`

- **Git** (for version control)
  - Download from: https://git-scm.com/
  - Verify: `git --version`

### Recommended Tools
- **VS Code** - Code editor (https://code.visualstudio.com/)
- **Postman** - API testing (https://www.postman.com/)
- **MongoDB Compass** - Database GUI (optional)

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Verify your email address

### Step 2: Create a Cluster
1. After logging in, click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region (choose closest to you)
4. Cluster Name: `TaskManagerCluster` (or any name)
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User
1. Click "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `taskmanager_user` (or your choice)
5. Password: Generate or create a strong password (SAVE THIS!)
6. Built-in Role: **Read and write to any database**
7. Click "Add User"

### Step 4: Configure Network Access
1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Option 1 (Recommended for development):
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"

   Option 2 (More secure):
   - Click "Add Current IP Address"
   - Confirm your IP

### Step 5: Get Connection String
1. Go back to "Database" (click "Database" in sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://taskmanager_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with your actual password**
7. Add database name before the `?`:
   ```
   mongodb+srv://taskmanager_user:yourpassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

---

## 🔙 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd TASK-3/backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- dotenv (environment variables)
- cors (cross-origin requests)
- nodemon (auto-restart on changes)

### Step 3: Configure Environment Variables
1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)

2. Open `.env` file in your editor

3. Update the values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://taskmanager_user:yourpassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:5173
   ```

   **Important:** Replace the entire `MONGODB_URI` line with your connection string from Step 5 of MongoDB Atlas Setup

### Step 4: Verify Setup
Start the backend server:
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000 in development mode
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

✅ **Backend is ready!** Keep this terminal open.

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal
Keep the backend terminal running and open a **new terminal window**.

### Step 2: Navigate to Frontend Directory
```bash
cd TASK-3/frontend
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- react & react-dom (UI library)
- vite (build tool)
- axios (HTTP client)
- date-fns (date formatting)
- lucide-react (icons)

Installation takes 2-3 minutes.

### Step 4: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

✅ **Frontend is ready!**

---

## 🚀 Running the Application

### Start Both Servers

**Terminal 1 - Backend:**
```bash
cd TASK-3/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd TASK-3/frontend
npm run dev
```

### Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/health

You should see the Task Manager interface! 🎉

---

## 🧪 Testing the API

### Option 1: Using the Frontend
Simply use the application UI to create, edit, delete tasks.

### Option 2: Using Postman

#### 1. Health Check
```
GET http://localhost:5000/health
```

Expected Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Get All Tasks
```
GET http://localhost:5000/api/tasks
```

#### 3. Create a Task
```
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "My First Task",
  "description": "This is a test task",
  "priority": "high",
  "status": "pending"
}
```

#### 4. Get Task Statistics
```
GET http://localhost:5000/api/tasks/stats
```

#### 5. Update a Task
```
PUT http://localhost:5000/api/tasks/{task_id}
Content-Type: application/json

{
  "status": "completed"
}
```

#### 6. Delete a Task
```
DELETE http://localhost:5000/api/tasks/{task_id}
```

### Option 3: Using cURL

```bash
# Health check
curl http://localhost:5000/health

# Get all tasks
curl http://localhost:5000/api/tasks

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"medium"}'
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"

**Error Message:**
```
❌ Error connecting to MongoDB: MongoServerError
```

**Solutions:**
1. Verify MongoDB URI in `.env` file
2. Check username and password are correct
3. Ensure password doesn't contain special characters (or URL-encode them)
4. Verify IP whitelist in MongoDB Atlas (try `0.0.0.0/0` for testing)
5. Check internet connection

### Issue 2: "Port 5000 already in use"

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Mac/Linux:
```bash
lsof -ti:5000 | xargs kill -9
```

Or change port in `.env`:
```env
PORT=5001
```

### Issue 3: "npm install" fails

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Try using a different registry:
   ```bash
   npm install --registry=https://registry.npmmirror.com
   ```

### Issue 4: CORS Error in Browser

**Error:** "Access to XMLHttpRequest at 'http://localhost:5000' has been blocked by CORS policy"

**Solutions:**
1. Verify `CLIENT_URL` in backend `.env` matches frontend URL
2. Restart backend server after changing `.env`
3. Check CORS configuration in `server.js`

### Issue 5: Frontend Shows "Network Error"

**Solutions:**
1. Verify backend is running on port 5000
2. Check backend terminal for errors
3. Verify proxy configuration in `vite.config.js`
4. Try accessing API directly: http://localhost:5000/health

### Issue 6: Tasks Not Appearing

**Solutions:**
1. Check browser console for errors (F12 → Console)
2. Verify API endpoints in `src/services/api.js`
3. Check MongoDB connection is active
4. Try creating a task manually via Postman
5. Check Network tab in browser DevTools

---

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🔄 Restarting the Application

### Stop Servers
- Press `Ctrl + C` in both terminal windows

### Start Again
```bash
# Terminal 1 - Backend
cd TASK-3/backend
npm run dev

# Terminal 2 - Frontend
cd TASK-3/frontend
npm run dev
```

---

## 📊 Verifying Success

### Backend Health Check
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Frontend Check
Visit: http://localhost:5173

You should see:
- Header with "Advanced Task Manager"
- Statistics cards showing 0 tasks
- Task creation form
- Empty state message

---

## 🎓 Next Steps

1. ✅ Create your first task
2. ✅ Try filtering and sorting
3. ✅ Edit a task
4. ✅ Mark task as completed
5. ✅ Delete a task
6. ✅ Explore the API with Postman
7. ✅ Check MongoDB Atlas to see stored data

---

## 📞 Need Help?

If you encounter issues not covered here:

1. Check the error message carefully
2. Search for the error online
3. Verify all environment variables
4. Ensure MongoDB Atlas is configured correctly
5. Try restarting both servers

---

**Setup Complete! 🎉** You're ready to use the Advanced MERN Task Manager!
