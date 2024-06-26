import express from "express";
import Users from "../controllers/users_controllers.js";
import Auth from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", Users.register);
userRoutes.post("/login", Users.login);

userRoutes.get("/users", Auth.authentication, Users.getAll);

//authentication and authorization
userRoutes.put(
  "/user/:id",
  Auth.authentication,
  Auth.userAuthorization,
  Users.put
);
userRoutes.delete(
  "/user/:id",
  Auth.authentication,
  Auth.userAuthorization,
  Users.delete
);

export default userRoutes;
