// Create web server

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Comment = require("./models/Comment");

// Connect to database
mongoose.connect("mongodb://localhost:27017/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create web server
const app = express();

// Use dependencies
app.use(bodyParser.json());
app.use(cors());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all comments
app.get("/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.send(err);
    } else {
      res.send(comments);
    }
  });
});

// Get comment by ID
app.get("/comments/:id", (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(comment);
    }
  });
});

// Create comment
app.post("/comments", (req, res) => {
  Comment.create(req.body, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(comment);
    }
  });
});

// Update comment
app.put("/comments/:id", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, comment) => {
      if (err) {
        res.send(err);
      } else {
        res.send(comment);
      }
    }
  );
});

// Delete comment
app.delete("/comments/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(comment);
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server started at port 3000");
});