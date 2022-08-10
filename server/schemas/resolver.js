const { AuthenticationError } = require("apollo-server-express");
const FormData = require("form-data");
const { User, Pet } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, ctx) => {
      if (ctx.user) {
        return User.findById(ctx.user._id);
      }
    },

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

    pet: async (_, { petId }, ctx) => {
      if (ctx.user) {
        const users = await User.find({
          pets: { $elemMatch: { _id: { $in: petId } } },
        }).select("-_v -password");

        return users.map((user) => user.pets).flat();
      }
    },

    findMatch: async (_, { petId }, ctx) => {
      if (ctx.user) {
        const user = await User.findById(ctx.user._id); // find user data

        const { likes, likesMe } = user.pets.find((pet) => pet.id === petId);
        const match = likes.filter((like) => likesMe.includes(like));
        const matchedPets = await User.find({
          pets: { $elemMatch: { _id: { $in: match } } },
        });
        return matchedPets;
      }
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
      const token = signToken(newUser);
      if (!newUser) {
        return `User creation failed`;
      }

      return { token, newUser };
    },

    // takes the pet _id of liked pet
    // returns array of liked pets
    likePet: async (_, { petId, likedId }, ctx) => {
      if (ctx.user) {
        const user = await User.findByIdAndUpdate(
          ctx.user._id,
          {
            $addToSet: { "pets.$[elem].likes": likedId },
          },
          {
            arrayFilters: [{ "elem._id": petId }],
            new: true,
            runValidators: true,
          }
        ).select("-_v -password");

        const likedPet = await User.findOneAndUpdate(
          {
            pets: { $elemMatch: { id: likedId } },
          },
          {
            $addToSet: { "pets.$[elem].likesMe": petId },
          },
          {
            arrayFilters: [{ "elem._id": likedId }],
            new: true,
            runValidators: true,
          }
        ).select("-_v -password");

        return user.pets.find((pet) => pet.id === petId);
      }
      throw new AuthenticationError(`Not Logged In`);
    },

    unlikePet: async (_, { petId, likedId }, ctx) => {
      if (ctx.user) {
        const user = await User.findByIdAndUpdate(
          ctx.user._id,
          {
            $pull: { "pets.$[elem].likes": likedId },
          },
          {
            arrayFilters: [{ "elem._id": petId }],
            new: true,
            runValidators: true,
          }
        ).select("-_v -password");

        const likedPet = await User.findOneAndUpdate(
          {
            pets: { $elemMatch: { id: likedId } },
          },
          {
            $pull: { "pets.$[elem].likesMe": petId },
          },
          {
            arrayFilters: [{ "elem._id": likedId }],
            new: true,
            runValidators: true,
          }
        ).select("-_v -password");

        return user.pets.find((pet) => pet.id === petId);
      }
      throw new AuthenticationError(`Not Logged In`);
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
    addPet: async (_, { input }, ctx) => {
      if (ctx.user) {
        const user = await User.findByIdAndUpdate(
          ctx.user._id,
          {
            $push: { pets: input },
          },
          {
            new: true,
            runValidators: true,
          }
        ).select("-_v -password");
        return user.pets[user.pets.length - 1];
      }
      throw new AuthenticationError(`Not Logged In`);
    },

    // takes petId and returns the user's data
    removePet: async (_, { petId }, ctx) => {
      if (ctx.user) {
        return await User.findByIdAndUpdate(
          ctx.user._id,
          {
            $pull: { pets: { _id: petId } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
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

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
