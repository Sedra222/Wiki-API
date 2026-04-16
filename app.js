const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/articlesDB");
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});
app.post("/articles", async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json({ message: "Added successfully" });
});
app.delete("/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
app.patch("/articles/:id", async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
