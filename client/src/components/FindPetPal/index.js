// FindPetPal Component

// import React
import React from "react";
import '../../styles/FindPetPal.css';

function FindPetPal() {
    return (
        <section className='findPetContainer'>
            <h1 className='findText'>Find a pal for your pet!</h1>
            <div>
            <img className='pupImg'src={require('../../assets/pals.jpeg')}
                alt="puppies"
            />
            </div>
            <div>
            <img className='pupImg'src={require('../../assets/dalmatian.jpeg')}
            alt="dalmatian"
            />
            </div>
            <div>
            <img className='pupImg' src={require('../../assets/frenchie.jpg')}
            alt="frenchie"
            />
            </div>
        </section>
    )
}

export default FindPetPal;