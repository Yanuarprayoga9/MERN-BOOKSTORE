import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());

app.use('/books',booksRoute)

mongoose
  .connect(MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("applistenn port ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
