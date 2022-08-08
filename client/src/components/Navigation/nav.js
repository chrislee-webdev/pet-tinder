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
          <Link
            to={"/login"}
            onClick={() => handlePageChange("Login")}
            className={currentPage === "Login" ? "nav-link active" : "nav-link"}
          >
            Login/Signup
          </Link>
        )}{" "}
        <Link
          to={"/"}
          onClick={() => handlePageChange("About")}
          className={currentPage === "About" ? "nav-link active" : "nav-link"}
        >
          Homepage
        </Link>
        <Link
          to={"/add-pet"}
          onClick={() => handlePageChange("AddPet")}
          className={currentPage === "AddPet" ? "nav-link active" : "nav-link"}
        >
          Add a pet
        </Link>
        <Link
          to={"find-pet-pal"}
          onClick={() => handlePageChange("FindPetPal")}
          className={
            currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
          }
        >
          Find pet pal
        </Link>
        <Link
          to={"/contact"}
          onClick={() => handlePageChange("Contact")}
          className={currentPage === "Contact" ? "nav-link active" : "nav-link"}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
