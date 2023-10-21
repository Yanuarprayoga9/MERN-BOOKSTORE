import express from "express"
import { bookModel } from "../models/booksModel.js";

const router = express.Router();
//GET ALL BOOKS
router.get("/", async (req, res) => {
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
  
  // CREATE DATA
  router.post("/", async (req, res) => {
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
  
  
  // GET DATA BY ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const book = await bookModel.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.json({ data: book });
    } catch (error) {
      // Handle any potential errors, e.g., invalid ObjectId format
      res
        .status(500)
        .json({ message: "Error finding book", error: error.message });
    }
  });
  
  // UPDATE BOOKS
  router.put("/:id", async (req, res) => {
    const {id} = req.params;
  
    const { title, author, publishYear } = req.body;
    try {
      if (!title || !author || !publishYear) {
        return res.status(201).send({ message: "send all required field" });
      }
      const book = await bookModel.findByIdAndUpdate(id,{ title, author, publishYear });
      res.json({message:"update successfully"});
    } catch (error) {
      res.send({ message: error.message });
    }
  });
  
  //DELETE BOOKS
  router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
      await bookModel.deleteOne({ id }); // returns {deletedCount: 1}
      res.send({message:"delete successfully"})
    } catch (error) {
      console.log(error.message)
    }
  })

  export default router;