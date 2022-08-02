const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Pet {
    _id: ID
    name: String
    picture: String
    age: Number
    breed: String
    gender: String
    coat: String
    color: String
    temperment: String
    funFact: String
    disabilities: String
    allergies: String
  }
  input PetInput {
    name: String
    picture: String
    age: Number
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
    passwword: String
    petCount: Number
    pets: [Pet]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    user(username: String!): User
    users: [User]
  }
  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
    addPet(input: PetInput!): User
    removePet(petId: String!): User
  }
`;

module.exports = typeDefs;
