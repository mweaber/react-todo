const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/reacttodolist"
);

const taskSeed = [
    {
        description: "Get React To-Do App to work",
        completed: false,
        date: new Date(Date.now())
    },
    {
        description: "Mow the lawn",
        completed: false,
        date: new Date(Date.now())
    },
    {
        description: "Get to bed",
        completed: false,
        date: new Date(Date.now())
    }
];

db.Task
  .remove({})
  .then(() => db.Task.collection.insertMany(taskSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
