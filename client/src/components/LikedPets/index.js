import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_MATCH, ME, PET } from "../../utils/queries";

//map pets to each user
//pets you like = matched
//pets like you = future match
// need access to user data and

export function LikedPets() {
  const {
    loading: loadingUserData,
    error: errorUser,
    data: { me },
  } = useQuery(ME);
  const {
    loading: findingMatch,
    error,
    data: { findMatch },
  } = useQuery(FIND_MATCH);
  const {
    loading: findingPet,
    error: petErr,
    data: { pet },
  } = useQuery(PET, {
    // variables: {petId: }
  });

  //pets you like
  const likedPets = [];

  // pets that like you
  const futureMatch = {};

  return (
    <section>
      {me.pets.map((pet) => (
        <div>
          <h2>Pets You Like</h2>
          {pet.likes.map((like) => (
            <p>like</p>
          ))}
        </div>
      ))}
    </section>
  );
}
