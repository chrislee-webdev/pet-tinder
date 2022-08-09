import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        petCount
        pets {
          _id
        }
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation AddPet($input: PetInput!) {
    addPet(input: $input) {
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
      likes
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($petId: String!) {
    removePet(petId: $petId) {
      user {
        _id
        usrname
        email
        password
        petCount
        Pet {
          _id
          name
          picture
          age
          breed
          gender
          coat
          temperment
          disabilities
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LIKE_PET = gql`
  mutation likePet($petId: String!, $likedId: String!) {
    likePet(petId: $petId, likedId: $likedId) {
      Pet {
        _id
        name
        picture
        age
        breed
        gender
        temperment
        likes
        likesMe
      }
    }
  }
`;

export const UNLIKE_PET = gql`
  mutation unlikePet($petId: String!, $likedId: String!) {
    unlikePet(petId: $petId, likedId: $likedId) {
      Pet {
        _id
        name
        picture
        age
        breed
        gender
        temperment
        likes
        likesMe
      }
    }
  }
`;

export const UPLOAD_PIC = gql`
  mutation UploadPic($input: Picture!) {
    uploadPic(input: $input) {
      filename
      name
      mime
      extention
      url
    }
  }
`;
