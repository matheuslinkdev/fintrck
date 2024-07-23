import express from "express";
import dashRoutes from "./routes/dashboardRoutes";
import dotenv from 'dotenv'
import { connectDB } from "./db/connection";
dotenv.config()

const app = express();
const port = process.env.PORT ;

app.use(express.json());

connectDB()

app.use("/dash", dashRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
