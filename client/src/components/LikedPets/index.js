import React from 'react';



//map pets to each user 
//pets you like = matched
//pets like you = future match
// need access to user data and 



//pets like you
const futureMatch = {
    
};



//pets you like 
const Matched = {
    
};
 


function LikedPets () {
    return (
        <section>
            <h2>Likes You!</h2>
            <p>
                <Select options={ futureMatch } />
            </p>

            <h2>Pets You Like</h2>
            <p> 
                <Select options={ Matched }/>
            </p>
        </section>
    )
}