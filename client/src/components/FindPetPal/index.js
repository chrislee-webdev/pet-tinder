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

    // const outOfFrame = (name) => {
    //   console.log(name + "left the screen!");
    // };

    return (
        <div>
            <div>
                <h1 className="findText">Find a pal for your pet!</h1>
            </div>

            <section className="findPetContainer">
                <div>
                    <img
                        className="pupImg"
                        src={require("../../assets/pals.jpeg")}
                        alt="puppies"
                    />
                    <div className="pup1">
                        <p>Name: Scooter (just a test)</p>
                        <p>Age: 2 years</p>
                        <p>Gender: Male</p>
                    </div>
                </div>
                <div>
                    <img
                        className="pupImg"
                        src={require("../../assets/dalmatian.jpeg")}
                        alt="dalmatian"
                    />
                    <p>Name: Rose (just a test)</p>
                    <p>Age: 2 years</p>
                    <p>Gender: Female</p>
                </div>
                <div>
                    <img
                        className="pupImg"
                        src={require("../../assets/frenchie.jpg")}
                        alt="frenchie"
                    />
                    <p>Name: Stitch (just a test)</p>
                    <p>Age: 3 years</p>
                    <p>Gender: Male</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                </div>
                
                {/* <img src={require("../../assets/pals.jpeg")} alt="puppies" />
      <div className="cardContainer"></div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )} */}
            </section>
        </div>

    );
}
//TODO: add pass and like buttons

export default FindPetPal;
