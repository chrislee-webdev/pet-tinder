import React from 'react';
import coverImage from  '../../assets/cover-image.jpeg';

function About() {
    return (
        <section>
            <img src={coverImage} style={{ width: '50%' }} alt='cover' />

            {/* title and decription of pet tinder */}
            <p>
                Pinder: Puppy Love!
            </p>
        </section>  
    )
}

export default About;
