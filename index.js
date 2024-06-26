import express from "express";
import dotenv from "dotenv";
import router from "./routes/main_routes.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
