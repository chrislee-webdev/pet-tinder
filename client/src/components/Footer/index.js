// import React from 'react'

// function Footer() {
//     return (
//         <section>
//             &copy; Pet Tinder 2022
//         </section>
//     )
// }

// export default Footer

import React from "react";
import { FiMail } from "react-icons/fi";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "../../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-div">
      <footer>
        <ul id="contacts" className="social-media-icons">
          <li>
            <a
              href="mailto:emandaabyou@gmail.com?subject=Mail from Our Site"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FiMail />
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/abyou.jiru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaFacebookSquare />
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abyou-geletu-5ba16622b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaLinkedin />
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abyou-geletu-5ba16622b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaGithub />
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/AbyouJiru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaTwitter />
              </div>
            </a>
          </li>
          <li className="instagram">
            <a
              href="https://www.instagram.com/ins_abyou/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaInstagram />
              </div>
            </a>
          </li>
        </ul>

        <div className="copyright">
          <a
            href="https://github.com/ghashe/License/tree/main"
            target="_blank"
            rel="noopener noreferrer"
          >
            <section>&copy; Pet Tinder 2022</section>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
