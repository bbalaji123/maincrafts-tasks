const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_env';

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // contains user id and email
    next();
  }catch(err){
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
