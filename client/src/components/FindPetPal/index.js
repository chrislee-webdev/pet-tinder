// FindPetPal Component

// import React
import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ME, PETS } from "../../utils/queries";
import auth from "../../utils/auth";

function FindPetPal() {
  const [lastDirection, setLastDirection] = useState();
  //TODO: get user data
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(ME);
  const { loading, error, data: petsData } = useQuery(PETS);

  if (userLoading || loading) {
    return <h1>Loading...</h1>;
  }
  if (userError || error) {
    console.log(userError);
    return <h1>Error!</h1>;
  }

  if (!auth.loggedIn()) {
    return <h3>Please log in to view this page!</h3>;
  }

  const { me } = userData;
  const { pets } = petsData;

  console.log(pets);

  const swipe = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen!");
  };

  return (
    <section>
      <h1>Find a pal for your pet!</h1>
      <img src={require("../../assets/pals.jpeg")} alt="puppies" />
      <div className="cardContainer">
        {/* {pets.map((character) => (
          <TinderCard
            className="swipe"
            key={pets.name}
            onSwipe={(dir) => swipe(dir, pets.name)}
            onCardLeftScreen={() => outOfFrame(pets.name)}
          >
            <div
              style={{ picture: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{pets.name}</h3>
            </div>
          </TinderCard>
        ))} */}
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </section>
  );
}
//TODO: add pass and like buttons

export default FindPetPal;
