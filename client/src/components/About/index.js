import React from "react";
import coverImage from "../../assets/cover-image.jpeg";

function About() {
  return (
    <section>
      <form className="login-form">
        <div>
          <label htmlFor="email-login">Email:</label>
          <input type="text" id="email-login" />
        </div>
        <div>
          <label htmlFor="password-login">Password:</label>
          <input type="password" id="password-login" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      <form className="signup-form">
        <div>
          <label htmlFor="username-signup">Username:</label>
          <input type="text" id="username-signup" />
        </div>
        <div>
          <label htmlFor="email-signup">Email:</label>
          <input type="text" id="email-signup" />
        </div>
        <div>
          <label htmlFor="password-signup">Password:</label>
          <input type="password" id="password-signup" />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>

      <img src={coverImage} style={{ width: "50%" }} alt="cover" />

      {/* title and decription of pet tinder */}
      <p>Pinder: Puppy Love!</p>
    </section>
  );
}

export default About;
