import { gql } from "@apollo/client";

export const PETS = gql`
  query getPets {
    pets {
      _id
      name
      picture
      age
      breed
      gender
      coat
      color
      temperment
      funFact
      disabilities
      allergies
    }
  }
`;
