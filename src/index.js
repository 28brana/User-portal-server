import express from "express";
import cors from "cors";
import connectDb from "./utils/connect-db.js";
import routes from "./routes/routes.js";
import handleErrors from "./utils/handleError.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/',routes);
app.use(handleErrors);


const startServer = () => {
  connectDb();
  app
    .listen(PORT, () => {
      console.log("Server Started");
    })
    .on("error", (err) => {
      console.log("Server Crashed");
    });
};

startServer();
