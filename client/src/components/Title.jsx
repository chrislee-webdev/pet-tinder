import React from "react";
import Profile from "../assets/pals.jpeg";
import "../styles/Title.css";

// function Title() {
//   return (
//     <div className="cont ">
//       <div className="profile">
//               <h1>Pet</h1> <br/>
//               <h1>Tinder</h1>
//       </div>
//     </div>
//   );
// }

// export default Title;

function Title() {
    return (
      <div className="cont ">
        <div className="profile">
          <img src={Profile} alt="" />
        </div>
      </div>
    );
  }
  
  export default Title;