import express from "express";
import dashRoutes from "./routes/dashboardRoutes";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT ;

app.use(express.json());

app.use("/dash", dashRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
