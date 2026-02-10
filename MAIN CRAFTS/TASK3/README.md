# 🚀 Advanced MERN Stack Task Manager

A production-grade, full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates industry-standard practices, clean architecture, and advanced features suitable for real-world applications.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express)

## ✨ Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks
- 🔄 **Real-time Updates** - Optimistic UI updates for instant feedback
- 📊 **Task Statistics** - Dashboard with completion rates and task counts
- 🔍 **Advanced Filtering** - Filter by status, priority, and custom sorting
- 🎨 **Priority Levels** - Low, Medium, High priority classification
- ⏰ **Timestamps** - Automatic tracking of creation and update times
- 📝 **Rich Task Details** - Title, description, status, and priority

### Advanced Features
1. **Optimistic UI Updates** - Instant feedback before server confirmation
2. **Custom React Hook (useTasks)** - Reusable task management logic
3. **Status-based Filtering** - Dynamic task filtering and sorting
4. **Modal-based Editing** - Clean UX for task modifications
5. **Smart Timestamp Formatting** - Human-readable relative time (e.g., "2 hours ago")
6. **Confirmation Dialogs** - Prevent accidental deletions
7. **Responsive Design** - Mobile-first approach with adaptive layouts
8. **Loading States** - Skeleton loaders and loading indicators
9. **Error Handling** - Comprehensive error messages and recovery
10. **Empty States** - Friendly UI when no tasks exist

### Technical Highlights
- 🏗️ **MVC Architecture** - Separation of concerns with Models, Views, Controllers
- 🔒 **Input Validation** - Frontend and backend validation
- 🎯 **Centralized API Service** - Consistent HTTP request handling
- 🌐 **RESTful API** - Standard HTTP methods and status codes
- 🎨 **Modern UI/UX** - Glassmorphism, gradients, and smooth animations
- ♿ **Accessibility** - ARIA labels and semantic HTML
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🚦 **HTTP Status Codes** - Proper use of 200, 201, 400, 404, 500
- 🔄 **Mongoose ODM** - Schema validation and middleware
- 🎭 **Environment Variables** - Secure configuration management

## 📸 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Task+Manager+Dashboard)

### Task Management
![Tasks](https://via.placeholder.com/800x400/764ba2/ffffff?text=Task+List+with+Filters)

## 🏗️ Project Structure

```
TASK-3/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── task.controller.js    # Business logic
│   ├── models/
│   │   └── Task.model.js         # Mongoose schema
│   ├── routes/
│   │   └── task.routes.js        # API routes
│   ├── middleware/
│   │   ├── errorHandler.js       # Error handling
│   │   └── logger.js             # Request logging
│   ├── server.js                 # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx      # Task creation form
    │   │   ├── TaskList.jsx      # Task list container
    │   │   ├── TaskItem.jsx      # Individual task
    │   │   ├── EditTaskModal.jsx # Edit modal
    │   │   ├── ConfirmDialog.jsx # Confirmation dialog
    │   │   ├── FilterBar.jsx     # Filtering controls
    │   │   ├── StatsCard.jsx     # Statistics display
    │   │   ├── EmptyState.jsx    # Empty state UI
    │   │   └── ErrorMessage.jsx  # Error display
    │   ├── hooks/
    │   │   └── useTasks.js       # Custom task hook
    │   ├── services/
    │   │   └── api.js            # API service
    │   ├── App.jsx               # Main component
    │   ├── App.css               # Styles
    │   └── main.jsx              # Entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd TASK-3
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Tasks
```http
GET /tasks?status=pending&priority=high&sortBy=createdAt&order=desc
```

#### Get Task by ID
```http
GET /tasks/:id
```

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and setup guide",
  "priority": "high",
  "status": "pending"
}
```

#### Update Task
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
```

#### Toggle Task Status
```http
PATCH /tasks/:id/toggle
```

#### Get Statistics
```http
GET /tasks/stats
```

### Response Format
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "657abc123def456",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🔧 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **lucide-react** - Icon library
- **CSS3** - Modern styling with animations

## 🎯 Key Architectural Decisions

### 1. **MVC Pattern in Backend**
Separates concerns between data (Model), business logic (Controller), and routing (Routes) for maintainability.

### 2. **Custom React Hook (useTasks)**
Encapsulates all task-related state and operations, making components clean and logic reusable.

### 3. **Optimistic UI Updates**
Updates UI immediately before server confirmation, providing instant feedback and better UX.

### 4. **Centralized API Service**
Single source of truth for all HTTP requests with consistent error handling and interceptors.

### 5. **Component Composition**
Small, focused components that are easy to test, maintain, and reuse.

### 6. **Environment-based Configuration**
Uses .env files to manage different configurations for development and production.

### 7. **Soft Delete Ready**
Model includes `isDeleted` field for potential soft delete implementation.

### 8. **Mongoose Middleware**
Pre-query middleware automatically filters out soft-deleted tasks.

### 9. **Error Boundaries**
Comprehensive error handling at multiple layers (frontend, backend, database).

### 10. **Responsive Design**
Mobile-first approach with breakpoints for tablet and desktop.

## 🧪 Code Quality Standards

### Backend
- ✅ Async/await with try-catch
- ✅ Proper HTTP status codes
- ✅ Input validation
- ✅ Centralized error handling
- ✅ Request logging
- ✅ Environment variables
- ✅ No hardcoded values

### Frontend
- ✅ Functional components
- ✅ React Hooks (useState, useEffect, custom hooks)
- ✅ Component reusability
- ✅ Prop validation via JSDoc
- ✅ Loading and error states
- ✅ Accessibility (ARIA labels)
- ✅ Clean and semantic JSX

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
CLIENT_URL=http://localhost:5173
```

### Frontend (optional .env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚦 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in .env
- Check network access whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### CORS Errors
- Verify CLIENT_URL in backend .env matches frontend URL
- Check CORS configuration in server.js

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

## 📈 Future Enhancements

- [ ] User authentication with JWT
- [ ] Task categories/tags
- [ ] Due dates with reminders
- [ ] File attachments
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Task sharing between users
- [ ] Email notifications
- [ ] Drag-and-drop reordering
- [ ] Task history/audit log

## 🤝 Contributing

This is an internship project demonstrating MERN stack proficiency. Feel free to fork and modify for learning purposes.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with 💜 by a MERN Stack Engineer

---

### 🌟 Star this project if you find it helpful!

**Built with passion and attention to detail for production-grade quality.**
