import React from "react";
import coverImage from "../../assets/cover-image.jpeg";
import '../../styles/About.css';



function About() {
  return (
    <section className="AboutContainer">
      <img className='coverImg' src={coverImage} style={{ width: "75%" }} alt="cover" />

      {/* title and decription of pet tinder */}
      {/* <p className='pinderText'>Pinder: Puppy Love!</p> */}
    </section>
  );
}

export default About;
