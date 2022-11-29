const connection = require("../config/connection");
const { User, Thought } = require("../models");
const users = require("./userSeeds");
const thoughts = require("./thoughtSeeds");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.info("seeding complete 🌱");
  process.exit(0);
});
