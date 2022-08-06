// FindPetPal Component

// import React
import React, { useState } from "react";
import TinderCard from "react-tinder-card";
//import userData from '../../../../server/seed/userData.json'
import { useQuery, useMutation } from "@apollo/client";
import { ME, PETS } from "../../utils/queries";

function FindPetPal() {
  //TODO: get user data
  const {
    loading: gettingUser,
    data: userData,
    error: UserDataErr,
  } = useQuery(ME);
  const {
    loading: gettingPets,
    data: petData,
    error: PetDataErr,
  } = useQuery(PETS);
  const [lastDirection, setLastDirection] = useState();

  if (gettingUser || gettingPets) {
    return <h1>Loading...</h1>;
  }

  const { me } = userData;
  const { pets } = petData;

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
        {pets.map((character) => (
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
        ))}
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
