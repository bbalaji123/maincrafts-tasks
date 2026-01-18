# 🚀 Professional MERN Stack To-Do List Application

A modern, clean, and production-ready To-Do List application built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript. This project demonstrates professional coding practices, clean architecture, and modern UI/UX design.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933)

---

## ✨ Features

- ✅ **Full TypeScript Implementation** - Type-safe code across frontend and backend
- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete tasks
- ✅ **Modern React with Hooks** - Functional components with latest React patterns
- ✅ **Professional UI/UX** - Clean, minimalistic design with smooth animations
- ✅ **Inline Task Editing** - Edit tasks directly with save/cancel options
- ✅ **RESTful API** - Well-structured Express.js backend with proper error handling
- ✅ **MongoDB Atlas Integration** - Cloud database with Mongoose ODM
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Loading States** - User-friendly feedback for all async operations
- ✅ **Error Handling** - Comprehensive error management throughout the app
- ✅ **Clean Architecture** - Organized folder structure following best practices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Custom professional styling with CSS variables

### Backend
- **Node.js** with TypeScript
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 📁 Project Structure

```
TASK-2/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── models/
│   │   │   └── Task.model.ts         # Task schema & model
│   │   ├── controllers/
│   │   │   └── task.controller.ts    # Business logic
│   │   ├── routes/
│   │   │   └── task.routes.ts        # API routes
│   │   ├── app.ts                    # Express app configuration
│   │   └── server.ts                 # Server entry point
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example env file
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskInput.tsx         # Task input component
    │   │   ├── TaskList.tsx          # Task list component
    │   │   └── TaskItem.tsx          # Task item component
    │   ├── services/
    │   │   └── api.ts                # API service layer
    │   ├── styles/
    │   │   └── global.css            # Global styles
    │   ├── App.tsx                   # Main app component
    │   └── main.tsx                  # Entry point
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas/register) (Free tier available)

### Installation

#### 1. Clone or Navigate to the Project

```bash
cd "C:\Users\boddu\OneDrive\Desktop\MAIN CRAFTS\TASK-2"
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Open .env file and update with your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:5000**

#### 3. Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:3000** and automatically open in your browser.

---

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### MongoDB Atlas Setup

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `.env` file

---

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | - |
| GET | `/tasks/:id` | Get a single task | - |
| POST | `/tasks` | Create a new task | `{ "text": "Task description" }` |
| PUT | `/tasks/:id` | Update a task | `{ "text": "Updated description" }` |
| DELETE | `/tasks/:id` | Delete a task | - |
| GET | `/health` | Health check | - |

### Example API Calls

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Create a Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Complete the project"}'
```

**Update a Task:**
```bash
curl -X PUT http://localhost:5000/api/tasks/YOUR_TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated task description"}'
```

**Delete a Task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/YOUR_TASK_ID
```

---

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface with neutral colors
- **Smooth Animations** - Subtle transitions and hover effects
- **Responsive Layout** - Adapts to all screen sizes
- **Loading States** - Visual feedback during API calls
- **Empty States** - Helpful messages when no tasks exist
- **Error Handling** - User-friendly error messages
- **Inline Editing** - Click edit button to modify tasks directly
- **Delete Confirmation** - Confirm before deleting tasks
- **Hover Actions** - Edit and delete buttons appear on hover
- **Keyboard Shortcuts** - Press Enter to save, Escape to cancel when editing
- **Accessibility** - Keyboard navigation and reduced motion support

---

## 🏗️ Build for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## 🧪 Development Scripts

### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔒 Security Features

- Input validation on both frontend and backend
- MongoDB injection prevention with Mongoose
- CORS enabled for secure cross-origin requests
- Environment variables for sensitive data
- Proper error handling without exposing sensitive information

---

## 🚀 Deployment

### Backend Deployment (Render/Heroku/Railway)

1. Push your code to GitHub
2. Connect your repository to the deployment platform
3. Set environment variables (MONGODB_URI, PORT)
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Update API_BASE_URL in `src/services/api.ts` to your backend URL

---

## 📝 Code Quality

- ✅ TypeScript strict mode enabled
- ✅ No `any` types
- ✅ Proper error handling
- ✅ Clean component architecture
- ✅ Reusable components
- ✅ Consistent code formatting
- ✅ Comprehensive comments
- ✅ No console errors

---

## 🤝 Contributing

This project was built as part of a MERN Stack internship task. Feel free to fork and improve!

---

## 📄 License

MIT License - Feel free to use this project for learning and portfolio purposes.

---

## 👨‍💻 Author

Built with ❤️ using the MERN stack

---

## 🎯 Future Enhancements

- [x] Complete CRUD operations (Create, Read, Update, Delete)
- [ ] Task completion toggle with checkboxes
- [ ] Task categories/tags
- [ ] User authentication
- [ ] Task priority levels
- [ ] Due dates and reminders
- [ ] Search and filter
- [ ] Dark mode
- [ ] Task statistics and analytics
- [ ] Drag and drop reordering

---

## 📞 Support

If you encounter any issues:

1. Ensure MongoDB Atlas connection string is correct
2. Check if backend is running on port 5000
3. Verify frontend is configured to connect to http://localhost:5000
4. Check browser console for errors
5. Ensure all dependencies are installed

---

## 🌟 Acknowledgments

- React Team for an amazing framework
- MongoDB for the excellent database solution
- TypeScript for type safety
- Vite for blazing-fast development experience

---

**Happy Coding! 🚀**
