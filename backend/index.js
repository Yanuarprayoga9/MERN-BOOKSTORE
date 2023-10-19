import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { bookModel } from "./models/booksModel.js";

const app = express();

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500);
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ data:book });
  } catch (error) {
    // Handle any potential errors, e.g., invalid ObjectId format
    res.status(500).json({ message: "Error finding book", error: error.message });
  }
});

app.post("/books", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return res.status(201).send({ message: "send all required field" });
    }
    const book = await bookModel.create({ title, author, publishYear });
    res.json(book);
  } catch (error) {
    res.send({ message: error.message });
  }
});

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
