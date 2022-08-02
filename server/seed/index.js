const connection = require("../config/connection");
const { User } = require("../models");
const userData = require("./userData.json");

connection.once("open", async () => {
  // clean database
  await User.deleteMany({});

  // bulk add users and pet data
  await User.insertMany(userData);

  console.log(`---- Complete ----`);
  process.exit(0);
});
