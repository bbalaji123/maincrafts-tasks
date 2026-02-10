# MERN Stack Task Manager

A full-stack task management application built with MongoDB, Express.js, React, and Node.js.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Clean and modern UI with gradient design
- Real-time data synchronization with MongoDB
- Responsive design for mobile and desktop

## Project Structure

```
TASK-1/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── frontend/
    ├── public/
    │   └── index.html    # HTML template
    ├── src/
    │   ├── components/   # React components
    │   │   ├── TaskForm.js
    │   │   ├── TaskList.js
    │   │   └── TaskItem.js
    │   ├── App.js        # Main App component
    │   ├── index.js      # React entry point
    │   └── *.css         # Styling files
    └── package.json      # Frontend dependencies
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Installation & Setup

### 1. Install MongoDB

**Windows:**
- Download MongoDB Community Server from the official website
- Run the installer and follow the setup wizard
- MongoDB will typically install to `C:\Program Files\MongoDB\Server\[version]\bin`
- Start MongoDB by running: `mongod` in a command prompt

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Setup Backend

Open a terminal/command prompt:

```bash
# Navigate to backend folder
cd c:\Users\boddu\OneDrive\Desktop\TASK-1\backend

# Install dependencies
npm install

# Start the backend server
npm start
```

You should see:
```
MongoDB connected successfully
Server is running on port 5000
```

### 3. Setup Frontend

Open a **NEW** terminal/command prompt:

```bash
# Navigate to frontend folder
cd c:\Users\boddu\OneDrive\Desktop\TASK-1\frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The browser will automatically open to `http://localhost:3000`

## How to Use the Application

1. **Access the App**: Open your browser and go to `http://localhost:3000`

2. **Add a Task**:
   - Type a task title in the input field
   - Optionally add a description
   - Click "Add Task" button

3. **Complete a Task**:
   - Click the checkbox next to a task to mark it as completed
   - Completed tasks will have a strikethrough and faded appearance

4. **Delete a Task**:
   - Click the "✕" button on the right side of any task

5. **View Statistics**:
   - Check the footer to see total tasks and completed tasks count

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing the API with curl

You can test the API directly using these commands:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all tasks
curl http://localhost:5000/api/tasks

# Create a new task
curl -X POST http://localhost:5000/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Test Task\", \"description\": \"This is a test\"}"
```

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running: `mongod`
- Check if port 5000 is already in use
- Verify Node.js is installed: `node --version`

### Frontend shows connection error
- Ensure the backend is running on port 5000
- Check browser console for detailed errors
- Verify the API_URL in App.js points to `http://localhost:5000/api`

### MongoDB connection fails
- Verify MongoDB service is running
- Check the MONGODB_URI in `.env` file
- Default connection string: `mongodb://localhost:27017/mern_tasks`

## Environment Variables

Backend `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_tasks
```

## Tech Stack

- **Frontend**: React 18, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Development**: Create React App, Nodemon

## Development Mode

For development with auto-reload:

**Backend:**
```bash
npm install -g nodemon
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## Production Build

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

This creates an optimized build in the `build/` folder.

## Author

MERN Stack Internship - Task 1

## License

MIT
