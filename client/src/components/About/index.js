import React from "react";
import coverImage from "../../assets/cover-image.jpeg";

function About() {
  return (
    <section className="AboutContainer">
      <img src={coverImage} style={{ width: "100%" }} alt="cover" />

      {/* title and decription of pet tinder */}
      <p>Pinder: Puppy Love!</p>
    </section>
  );
}

export default About;
