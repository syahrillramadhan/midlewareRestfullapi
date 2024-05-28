import express from 'express';
import Movies from '../controllers/movies_controllers.js';
import Auth from '../middlewares/auth.js';

const moviesRoutes = express.Router();

moviesRoutes.get('/movies', Movies.getAll);
moviesRoutes.post('/movies', Auth.adminAuthorization, Movies.post);
moviesRoutes.put('/movies/:id', Auth.adminAuthorization, Movies.put);
moviesRoutes.delete('/movies/:id', Auth.adminAuthorization, Movies.delete);

export default moviesRoutes;