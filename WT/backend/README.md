# Backend - Express + Mongoose

Prereqs: Node.js, npm, MongoDB (or MongoDB Atlas)

1. Install dependencies

   npm install

2. Configure env

   Create a `.env` file in `backend/` with:

   MONGO_URI=mongodb://localhost:27017/elearn
   PORT=4000
   JWT_SECRET=replace_with_a_strong_secret

3. Start server

   npm start

4. Seed sample data

   npm run seed

Notes:
- Endpoints to register/login: POST /api/users/register and POST /api/users/login
- Protected endpoints: POST /api/downloads and POST /api/feedback require Authorization: Bearer <token>

APIs available under http://localhost:4000/api
