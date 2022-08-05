// FindPetPal Component

// import React
import React from "react";
import '../../styles/FindPetPal.css';

function FindPetPal() {
    return (
        <section className='findPetContainer'>
            <h1 className='findText'>Find a pal for your pet!</h1>
            <img src={require('../../assets/pals.jpeg')}
                alt="puppies"
            />
         
        </section>
    )
}

export default FindPetPal;