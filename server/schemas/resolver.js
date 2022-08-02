const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    // takes either a username or an email
    // returns single user obj
    // data: {
    //  user: {
    //    _id,
    //   username,
    //   email,
    //   password,
    //   petCount,
    //   pets: {
    //     _id,
    //     name,
    //     picture
    //     age
    //     breed
    //     gender
    //     coat
    //     color
    //     temperment
    //     funFact
    //     disabilities
    //     allergies
    //   }
    //  }
    // }
    user: async (parent, { username }) => {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        return "No user found";
      }
      return user;
    },

    // return array of all users
    users: async function (_, args) {
      return await User.find();
    },

    // return array of all pets
    // data: {
    //   pets: [
    //       {
    //         _id,
    //         name,
    //         picture,
    //         age,
    //         breed,
    //         gender,
    //         coat,
    //         color,
    //         temperment,
    //         funFact,
    //         disabilities,
    //         allergies,
    //       }
    //     ]
    // }
    // returns array of pet data from all users
    pets: async (_, args) => {
      const users = await User.find();
      const pets = users.map((user) => user.pets);
      return pets.flat();
    },
  },

  Mutation: {
    // takes username, email, and password strings
    // will eventually return auth token and user obj with id
    addUser: async (_, { username, email, password }) => {
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

    // takes pet obj:
    //    age,
    //    allergies,
    //    breed,
    //    coat,
    //    color,
    //    disabilities,
    //    funFact,
    //    gender,
    //    name,
    //    picture: url,
    //    temperment
    // returns new user's pet data
    addPet: async (_, { input, id }) => {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $push: { pets: input },
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-_v -password");
      return user.pets[user.pets.length - 1];
    },

    // takes petId and returns the user's data
    removePet: async (_, { petId, userId }) => {
      return await User.findByIdAndUpdate(
        userId,
        {
          $pull: { pets: { _id: petId } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    // returns user data

    login: async (_, { email, password }) => {
      const user = await User.findOne({
        $or: [{ username: email }, { email: email }],
      });

      if (!user) {
        throw new AuthenticationError(`Incorrect username or password`);
      }

      const passVal = await user.isPassword(password);
      if (!passVal) {
        throw new AuthenticationError(`Incorrect username or password`);
      }

      return user;
    },
  },
};

module.exports = resolvers;
