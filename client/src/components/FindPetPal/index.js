// FindPetPal Component

// import React
import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ME, PETS } from "../../utils/queries";
import auth from "../../utils/auth";
import '../../styles/FindPetPal.css';

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
    <section className='findPetContainer'>
    <h1 className='findText'>Find a pal for your pet!</h1>

    <div>
      <ul>
        <li>Name: Bowie</li>
        <li>Age: 3 years</li>
        <li>Breed: Golden Retriever</li>
        <li>Temperament: Happy</li>
      </ul>
    <img className='pupImg'src={require('../../assets/pals.jpeg')}
        alt="puppies"
    />
    </div>

    <div>
    <img className='pupImg'src={require('../../assets/dalmatian.jpeg')}
    alt="dalmatian"
    />
    <ul>
      <li>Name: Dottie</li>
      <li>Age: 2 years</li>
      <li>Breed: Dalmation</li>
      <li>Temperament: Excellent family dog</li>
    </ul>
    </div>

    <div>
    <ul>
      <li>Name: Spudz McKenzie</li>
      <li>Age: 3 years</li>
      <li>Breed: French Bulldog</li>
      <li>Temperment: Stubborn</li>
    </ul>
    <img className='pupImg' src={require('../../assets/frenchie.jpg')}
    alt="frenchie"
    />
    </div>

      {/* <img src={require("../../assets/pals.jpeg")} alt="puppies" /> */}
      <div className="cardContainer"></div>
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
