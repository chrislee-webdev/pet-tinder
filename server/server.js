const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
// const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.send(`<h1>Test</h1>`);
});

app.listen(PORT, () => console.log(`----Listening on PORT: ${PORT}----`));
