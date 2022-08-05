import React from 'react';



//map pets to each user 
//pets you like = matched
//pets like you = future match
// need access to user data and 



//pets like you
const futureMatch = {
 //TODO: access userData to find likes 
};



//pets you like 
const Matched = {
    //TODO: access userData to find matches
};
 


function LikedPets () {
    return (
        <section>
            <h2>Likes You!</h2>
            <div>
                { futureMatch } 
            </div>

            <h2>Pets You Like</h2>
            <div> 
                { Matched }
            </div>
        </section>
    )
}

export default LikedPets