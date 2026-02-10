# SETUP INSTRUCTIONS

## Quick Start Guide

### Step 1: Install Backend Dependencies

Open a terminal in the `backend` folder:

```bash
cd backend
npm install
```

### Step 2: Configure MongoDB

1. Open `backend/.env` file
2. Replace the MONGODB_URI with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
   ```

### Step 3: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on http://localhost:5000
```

### Step 4: Install Frontend Dependencies

Open a NEW terminal in the `frontend` folder:

```bash
cd frontend
npm install
```

### Step 5: Start Frontend Server

```bash
npm run dev
```

The app will automatically open at http://localhost:3000

---

## Troubleshooting

### Backend won't start:
- Ensure MongoDB connection string is correct
- Check if port 5000 is available

### Frontend can't connect to backend:
- Verify backend is running on http://localhost:5000
- Check browser console for errors

### MongoDB connection fails:
- Verify username/password in connection string
- Check if IP is whitelisted in MongoDB Atlas
- Ensure cluster is active

---

## File Structure Verification

Your project should have this structure:

```
TASK-2/
├── backend/
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   └── index.html
└── README.md
```

---

## Next Steps

1. Open http://localhost:3000 in your browser
2. Try adding a task
3. The task should appear in the list
4. Check MongoDB Atlas to see the data

Enjoy your professional MERN Stack To-Do app! 🎉
