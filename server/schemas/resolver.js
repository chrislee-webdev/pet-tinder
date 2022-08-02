const { AuthentcationError } = require("apollo-server-express");
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
    //     {
    //     pets: [
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
    //   }
    // ]
    // }
    pets: async (_, args) => {
      return await User.find(); // returns array of pet data from all users
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
    // returns new array of user's pets
    addPet: async (_, { input, id }) => {
      return await User.findByIdAndUpdate(
        id,
        {
          $push: { pets: input },
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-_v -password");
    },

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
  },
};

module.exports = resolvers;
