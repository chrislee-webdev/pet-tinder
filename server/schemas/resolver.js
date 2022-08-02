const { AuthentcationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    // return a user
    user: async (parent, { username }) => {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        return "No user found";
      }
      return user;
    },

    // return all users
    users: async function (parent, args) {
      return await User.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
      });
      if (!newUser) {
        return `User creation failed`;
      }

      return newUser;
    },
  },
};

module.exports = resolvers;
