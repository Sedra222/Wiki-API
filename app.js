const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/articlesDB");

// Schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

// 🔵 GET ALL
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// 🔵 POST (ADD)
app.post("/articles", async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json({ message: "Added successfully" });
});

// 🔵 DELETE
app.delete("/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 🔵 PATCH (UPDATE)
app.patch("/articles/:id", async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});