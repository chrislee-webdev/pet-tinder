// // // Navigation Component

// // // import React
// // import React, { useEffect, useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import auth from "../../utils/auth";
// // import "../../styles/Navigation.css";
// // import { GiHamburgerMenu } from "react-icons/gi";

// // // Navigation function
// // function Navigation({ currentPage, handlePageChange }) {
// //   const [expandNavbar, setExpandNavbar] = useState(false);
// //   const location = useLocation();

// //   useEffect(() => {
// //     setExpandNavbar(false);
// //   }, [location]);

// //   return (
// //     <header className="header">
// //       <h1 className="webTitle">Pinder: Puppy Love!</h1>
// //       <div className="navbar" id={expandNavbar ? "open" : "close"}>
// //         <div className="toggleButton">
// //           <button
// //             onClick={() => {
// //               setExpandNavbar((prev) => !prev);
// //             }}
// //           >
// //             <GiHamburgerMenu />
// //           </button>
// //         </div>
// //       </div>

// //       <nav className="links">
// //         <ul>
// //           <li className="mx-2 btn links">
// //             {auth.loggedIn() ? (
// //               <Link
// //                 to={"/"}
// //                 onClick={() => auth.logout()}
// //                 className={
// //                   currentPage === "Logout" ? "nav-link active" : "nav-link"
// //                 }
// //               >
// //                 Logout
// //               </Link>
// //             ) : (
// //               <Link
// //                 to={"/login"}
// //                 onClick={() => handlePageChange("Login")}
// //                 className={
// //                   currentPage === "Login" ? "nav-link active" : "nav-link"
// //                 }
// //               >
// //                 Login/Signup
// //               </Link>
// //             )}{" "}
// //           </li>
// //           <li className="mx-2 btn links">
// //             <Link
// //               to={"/"}
// //               onClick={() => handlePageChange("About")}
// //               className={
// //                 currentPage === "About" ? "nav-link active" : "nav-link"
// //               }
// //             >
// //               Homepage
// //             </Link>
// //           </li>
// //           {auth.loggedIn() && (
// //             <li className="mx-2 btn links">
// //               <Link
// //                 to={"/add-pet"}
// //                 onClick={() => handlePageChange("AddPet")}
// //                 className={
// //                   currentPage === "AddPet" ? "nav-link active" : "nav-link"
// //                 }
// //               >
// //                 Add a pet
// //               </Link>
// //             </li>
// //           )}{" "}
// //           {auth.loggedIn() && (
// //             <li className="mx-2 btn links">
// //               <Link
// //                 to={"/my-likes"}
// //                 onClick={() => handlePageChange("MyLikes")}
// //                 className={
// //                   currentPage === "MyLikes" ? "nav-link active" : "nav-link"
// //                 }
// //               >
// //                 My Likes
// //               </Link>
// //             </li>
// //           )}{" "}
// //           <li className="mx-2 btn links">
// //             <Link
// //               to={"find-pet-pal"}
// //               onClick={() => handlePageChange("FindPetPal")}
// //               className={
// //                 currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
// //               }
// //             >
// //               Find pet pal
// //             </Link>
// //           </li>
// //           <li className="mx-2 btn links">
// //             <Link
// //               to={"/contact"}
// //               onClick={() => handlePageChange("Contact")}
// //               className={
// //                 currentPage === "Contact" ? "nav-link active" : "nav-link"
// //               }
// //             >
// //               Contact
// //             </Link>
// //           </li>
// //         </ul>
// //       </nav>
// //     </header>
// //   );
// // }

// // export default Navigation;

// Navigation Component

// // import React
// import React, { useEffect, useState } from "react";
// import auth from "../../utils/auth";
// import { Link, useLocation } from "react-router-dom";
// import "../../styles/Navigation.css";
// import { GiHamburgerMenu } from "react-icons/gi";

// // Navigation function
// function Navigation({ currentPage, handlePageChange }) {
//   const [expandNavbar, setExpandNavbar] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setExpandNavbar(false);
//   }, [location]);

//   return (
//     <div className="navbar" id={expandNavbar ? "open" : "close"}>
//       {/* <h1 className="webTitle">Pinder: Puppy Love!</h1> */}
//       <div className="toggleButton">
//         <button
//           onClick={() => {
//             setExpandNavbar((prev) => !prev);
//           }}
//         >
//           <GiHamburgerMenu />
//         </button>
//       </div>

//       <div className="links">
//         {auth.loggedIn() ? (
//           <Link
//             to={"/"}
//             onClick={() => auth.logout()}
//             className={
//               currentPage === "Logout" ? "nav-link active" : "nav-link"
//             }
//           >
//             Logout
//           </Link>
//         ) : (
//           <Link
//             to={"/login"}
//             onClick={() => handlePageChange("Login")}
//             className={currentPage === "Login" ? "nav-link active" : "nav-link"}
//           >
//             Login/Signup
//           </Link>
//         )}{" "}
//         <Link
//           to={"/"}
//           onClick={() => handlePageChange("About")}
//           className={currentPage === "About" ? "nav-link active" : "nav-link"}
//         >
//           Homepage
//         </Link>
//         {auth.loggedIn() && (
//           <Link
//             to={"/add-pet"}
//             onClick={() => handlePageChange("AddPet")}
//             className={
//               currentPage === "AddPet" ? "nav-link active" : "nav-link"
//             }
//           >
//             Add a pet
//           </Link>
//         )}{" "}
//         {auth.loggedIn() && (
//           <Link
//             to={"/my-likes"}
//             onClick={() => handlePageChange("MyLikes")}
//             className={
//               currentPage === "MyLikes" ? "nav-link active" : "nav-link"
//             }
//           >
//             My Likes
//           </Link>
//         )}{" "}
//         <Link
//           to={"find-pet-pal"}
//           onClick={() => handlePageChange("FindPetPal")}
//           className={
//             currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
//           }
//         >
//           Find pet pal
//         </Link>
//         <Link
//           to={"/contact"}
//           onClick={() => handlePageChange("Contact")}
//           className={currentPage === "Contact" ? "nav-link active" : "nav-link"}
//         >
//           Contact
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Navigation;

// Navigation Component

// import React
import React, { useEffect, useState } from "react";
import auth from "../../utils/auth";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navigation.css";
import { GiHamburgerMenu } from "react-icons/gi";

// Navigation function
function Navigation({ currentPage, handlePageChange }) {
  const [expandNavbar, setExpandNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  return (
    <div className="navbar" id={expandNavbar ? "open" : "close"}>
      <div className="toggleButton">
        <button
          onClick={() => {
            setExpandNavbar((prev) => !prev);
          }}
        >
          <GiHamburgerMenu />
        </button>
      </div>

      <div className="links">
        {auth.loggedIn() ? (
          // <div className="nav-links">
          <Link
            to={"/"}
            onClick={() => auth.logout()}
            className={
              currentPage === "Logout" ? "nav-link active" : "nav-link"
            }
          >
            Logout
          </Link>
        ) : (
          // <div className="nav-links">
          <Link
            to={"/login"}
            onClick={() => handlePageChange("Login")}
            className={currentPage === "Login" ? "nav-link active" : "nav-link"}
          >
            Login/Signup
          </Link>
        )}{" "}
        {/* <div className="nav-links"> */}
        <Link
          to={"/"}
          onClick={() => handlePageChange("About")}
          className={currentPage === "About" ? "nav-link active" : "nav-link"}
        >
          Homepage
        </Link>
        {/* </div> */}
        {auth.loggedIn() && (
          // <div className="nav-links">
          <Link
            to={"/add-pet"}
            onClick={() => handlePageChange("AddPet")}
            className={
              currentPage === "AddPet" ? "nav-link active" : "nav-link"
            }
          >
            Add a pet
          </Link>
        )}{" "}
        {auth.loggedIn() && (
          // <div className="nav-links">
          <Link
            to={"/my-likes"}
            onClick={() => handlePageChange("MyLikes")}
            className={
              currentPage === "MyLikes" ? "nav-link active" : "nav-link"
            }
          >
            My Likes
          </Link>
        )}{" "}
        {/* <div className="nav-links"> */}
        <Link
          to={"find-pet-pal"}
          onClick={() => handlePageChange("FindPetPal")}
          className={
            currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
          }
        >
          Find pet pal
        </Link>
        {/* </div> */}
        {/* <div className="nav-links"> */}
        <Link
          to={"/contact"}
          onClick={() => handlePageChange("Contact")}
          className={currentPage === "Contact" ? "nav-link active" : "nav-link"}
        >
          Contact
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Navigation;
