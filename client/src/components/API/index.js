import React from "react";
import { useQuery } from "@apollo/client";
import { PETS } from "../../utils/queries";

function API() {
  const { loading, error, data } = useQuery(PETS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1>error</h1>;
  }

  const { pets } = data;

  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet._id}>
          <h3>{pet.name}</h3>
          <img src={pet.picture} alt={`picture of dog named ${pet.name}`} />
          <p>Age: {pet.age}</p>
          <p>{pet.gender}</p>
          <p>{pet.breed}</p>
        </li>
      ))}
    </ul>
  );
}

export default API;
