import express from 'express';
import Users from '../controllers/users_controllers.js';
import Auth from '../middlewares/auth.js';

const userRoutes = express.Router();

// Ga butuh auth apa-apa 
userRoutes.post('/register', Users.register);
userRoutes.post('/login', Users.login);

// Cuma pakai authentication aja
userRoutes.get('/users', Auth.authentication, Users.getAll);

// Pakai authentication dan authorization
userRoutes.put('/user/:id', Auth.authentication, Auth.userAuthorization, Users.put);
userRoutes.delete('/user/:id', Auth.authentication, Auth.userAuthorization, Users.delete);

export default userRoutes;