import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { FIND_MATCH, ME, PET } from "../../utils/queries";

//map pets to each user
//pets you like = matched
//pets like you = future match
// need access to user data and

export function LikedPets() {
  const [petState, setPet] = useState("");
  const { loading: gettingMe, error: meErr, data: myData } = useQuery(ME);

  const [getLiked, { data, error, loading }] = useLazyQuery(PET, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (petState !== "") {
      getLiked({ variables: { petId: petState.likes } });
    }
    console.log(petState);
  }, [petState]);

  if (gettingMe) {
    return <h1>Loading...</h1>;
  }
  if (meErr) {
    return <h1>Server Error!</h1>;
  }

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  const { me } = myData;

  //pets you like
  const likedPets = [];

  // pets that like you
  const futureMatch = {};

  return (
    <section>
      <h2>Click your pet to see who you've liked</h2>
      {me.pets.map((petEl) => (
        <ol key={petEl._id}>
          <h3 onClick={() => setPet(me.pets.find((x) => x._id === petEl._id))}>
            {petEl.name}
          </h3>
          {petEl._id === petState._id &&
            data?.pet.map((el) => <li key={el._id}>{el.name}</li>)}
        </ol>
      ))}
    </section>
  );
}
