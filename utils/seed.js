const connection = require("../config/connection");
const User = require("../models/User");
const Thought = require("../models/Thought");
const users = require("./userSeeds");
const thoughts = require("./thoughtSeeds");

console.time("seeding");

connection.once("open", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
