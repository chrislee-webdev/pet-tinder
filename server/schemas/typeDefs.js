const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Pet {
    _id: ID
    name: String
    picture: String
    age: String
    breed: String
    gender: String
    coat: String
    color: String
    temperment: String
    funFact: String
    disabilities: String
    allergies: String
    likes: [String]
    likesMe: [String]
  }
  input PetInput {
    name: String
    picture: String
    age: String
    breed: String
    gender: String
    coat: String
    color: String
    temperment: String
    funFact: String
    disabilities: String
    allergies: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    petCount: Int
    pets: [Pet]
  }
  type Auth {
    token: ID!
    user: User
  }
  input Picture {
    name: String
    formData: String
  }
  type uploadedPic {
    filename: String
    name: String
    mime: String
    extention: String
    url: String
  }
  type Query {
    me: User
    user(username: String!): User
    users: [User]
    pets: [Pet]
    pet(petId: [String]!): [Pet]
    findMatch(petId: String!): [User]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likePet(petId: String!, likedId: String!): Pet
    unlikePet(petId: String!, likedId: String!): Pet
    addPet(input: PetInput!): Pet
    removePet(petId: String!): User
    uploadPic(input: Picture!): uploadedPic
  }
`;

module.exports = typeDefs;
