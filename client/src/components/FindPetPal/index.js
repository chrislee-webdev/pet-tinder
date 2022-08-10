// FindPetPal Component

// import React
import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ME, PETS } from "../../utils/queries";
import auth from "../../utils/auth";
import "../../styles/FindPetPal.css";

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
  //   const [lastDirection, setLastDirection] = useState();

  if (gettingUser || gettingPets) {
    return <h1>Loading...</h1>;
  }

  const { me } = userData;
  const { pets } = petData;

  // const swipe = (direction, nameToDelete) => {
  //   console.log("removing: " + nameToDelete);
  //   setLastDirection(direction);
  // };

  // const swipe = (direction, nameToDelete) => {
  //   console.log("removing: " + nameToDelete);
  //   setLastDirection(direction);
  // };

  // const outOfFrame = (name) => {
  //   console.log(name + "left the screen!");
  // };

  return (
    <section className="findPetContainer">
      <h1 className="findText">Find a pal for your pet!</h1>

      <div className="petProfile">
        <img
          className="pupImg"
          src={require("../../assets/pals.jpeg")}
          alt="puppies"
        />
        <ul>
          <li>Name: Bowie</li>
          <li>Age: 3 years</li>
          <li>Breed: Golden Retriever</li>
          <li>Temperament: Happy</li>
        </ul>
        <button>Like</button> <button>Pass</button>
      </div>

      <div className="petProfile">
        <button>Like</button> <button>Pass</button>
        <img
          className="pupImg"
          src={require("../../assets/dalmatian.jpeg")}
          alt="dalmatian"
        />
        <ul>
          <li>Name: Dottie</li>
          <li>Age: 2 years</li>
          <li>Breed: Dalmation</li>
          <li>Temperament: Excellent family dog</li>
        </ul>
      </div>

      <div className="petProfile">
        <img
          className="pupImg"
          src={require("../../assets/frenchie.jpg")}
          alt="frenchie"
        />
        <ul>
          <li>Name: Spudz McKenzie</li>
          <li>Age: 3 years</li>
          <li>Breed: French Bulldog</li>
          <li>Temperament: Stubborn</li>
        </ul>
        <button>Like</button> <button>Pass</button>
      </div>

      <div className="petProfile">
        <img
          className="pupImg"
          src={require("../../assets/shiba-inu.jpeg")}
          alt="frenchie"
        />
        <ul>
          <li>Name: Mochi</li>
          <li>Age: 3 years</li>
          <li>Breed: Shiba Inu</li>
          <li>Temperament: Stubborn</li>
        </ul>
        <button>Like</button> <button>Pass</button>
      </div>

      {/* <img src={require("../../assets/pals.jpeg")} alt="puppies" /> */}
      {/* <div className="cardContainer"></div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )} */}
    </section>
  );
}
//TODO: add pass and like buttons

export default FindPetPal;
