import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const verifyToken = (req, resp, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.status(401).json({ message: "Token is not valid" });
  }
};

export const me = async (req, resp) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      console.log('Token verification error:', err.message);
      return resp.status(400).json({ message: 'Invalid token' });
    } else {
      try {
        // Retrieve user from the database
        const user = await User.findById(authData.id); // Ensure you import User at the top if needed
        if (!user) {
          return resp.status(404).json({ message: 'User not found' });
        }
        // Respond with user data
        resp.json({ user: { fullname: user.fullname, email: user.email, role: user.role } });
      } catch (error) {
        console.log('Error fetching user:', error.message);
        resp.status(500).json({ message: 'Internal server error' });
      }
    }
  });
};
