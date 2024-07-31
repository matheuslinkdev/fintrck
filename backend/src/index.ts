import express from "express";
import cors from "cors"; 
import dashRoutes from "./routes/dashboardRoutes";
import remindersRoutes from "./routes/remindersRoutes";
import dotenv from "dotenv";
import { connectDB } from "./db/connection";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "./messages/apiGuide.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading the file.");
      return;
    }
    res.send(data);
  });
});

app.use("/dash", dashRoutes);
app.use("/", remindersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
