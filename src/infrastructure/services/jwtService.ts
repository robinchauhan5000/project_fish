
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
