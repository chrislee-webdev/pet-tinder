import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
            username
            petCount
            pets {
                _id
            }
        }
    }
}`;

export const ADD_PET = gql`
mutation addPet($input: PetInput!, id: String!) {
    addPet(input: $PetInput, id: $String) {
        PetInput {
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
        allergies}
      }
    }
}`;

export const REMOVE_PET = gql`
mutation removePet($petId: String!, $userId: String!) {
    removePet(petId: $String, userId: $String) {
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
        }}
    }
}`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $String, password: $String) {
        token:
            user{
                _id
                username
                email
                password        
            }
    }
}
`;