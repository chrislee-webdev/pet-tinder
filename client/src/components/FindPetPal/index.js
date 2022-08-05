// FindPetPal Component

// import React
import React, { useState } from "react";
//import userData from '../../../../server/seed/userData.json'
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../../utils/queries";




function FindPetPal() {


    return (
        <section>
            <h1>Find a pal for your pet!</h1>
            <img src={require('../../assets/pals.jpeg')}
                alt="puppies"
            />
   
    </section>
  )
}
//TODO: add pass and like buttons 



export default FindPetPal;