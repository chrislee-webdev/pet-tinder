import React from 'react';
import coverImage from  '../../assets/cover-image.jpeg';

function About() {
    return (
        <section>
            <img src={coverImage} style={{ width: '75%' }} alt='cover' />

            {/* title and decription of pet tinder */}
            <p>
                Pet Tinder!
            </p>
        </section>  
    )
}

export default About;
