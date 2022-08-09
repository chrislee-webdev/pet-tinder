import "../../styles/Contact.css";
import React from "react";
import emailjs from "emailjs-com";
import Emoji from "a11y-react-emoji";

function Contact() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dfy6l8n",
        "template_j7g4yt2",
        e.target,
        "4DjJvzQ12pJrbv_pY"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          console.log(result.text);
          console.log("message sent");
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div className="form_container">
      <h1>We’d Love to Hear from You </h1>
      <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>
          Hi <Emoji symbol="👋" label="love" /> What's your name?
        </label>
        <input type="text" name="from_name" />
        <label>What's your email?</label>
        <input type="email" name="from_email" />
        <label>Subject</label>
        <input type="text" name="from_name" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Contact;
