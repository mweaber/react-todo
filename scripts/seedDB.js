const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactbookprac"
);

const bookSeed = [
  {
    title: "Test1",
    author: "Me",
    synopsis:
      "This is a test book. Next up is the D&D app you want to build.",
    date: new Date(Date.now())
  },

];

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
