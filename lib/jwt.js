import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = '1h';

export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { 
    algorithm: 'HS256',
    expiresIn: EXPIRES_IN 
});
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });
  } catch (error) {
    return null;
  }
}  