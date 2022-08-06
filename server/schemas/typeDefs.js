const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Pet {
    _id: ID
    name: String
    picture: String
    age: Int
    breed: String
    gender: String
    temperament: String
  }
  input PetInput {
    name: String
    picture: String
    age: Int
    breed: String
    gender: String
    temperament: String
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
  type Query {
    me: User
    user(username: String!): User
    users: [User]
    pets: [Pet]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPet(input: PetInput!): Pet
    removePet(petId: String!): User
  }
`;

module.exports = typeDefs;
