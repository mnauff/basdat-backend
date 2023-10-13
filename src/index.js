import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Define your routes here
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
