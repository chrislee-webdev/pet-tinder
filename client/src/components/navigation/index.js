// Navigation Component

// import React
import React from "react";
import auth from "../../utils/auth";

// Navigation function
function Navigation({ currentPage, handlePageChange }) {
  return (
    <header>
      <h1>Pet Tinder</h1>

      <nav>
        <ul>
          <li className="mx-2">
            {auth.loggedIn() ? (
              <a
                onClick={() => auth.logout()}
                className={
                  currentPage === "Logout" ? "nav-link active" : "nav-link"
                }
              >
                Logout
              </a>
            ) : (
              <a
                onClick={() => handlePageChange("Login")}
                className={
                  currentPage === "Login" ? "nav-link active" : "nav-link"
                }
              >
                Login/Signup
              </a>
            )}{" "}
          </li>

          <li className="mx-2">
            <a
              onClick={() => handlePageChange("About")}
              className={
                currentPage === "About" ? "nav-link active" : "nav-link"
              }
            >
              Homepage
            </a>
          </li>

          <li className="mx-2">
            <span
              onClick={() => handlePageChange("AddPet")}
              className={
                currentPage === "AddPet" ? "nav-link active" : "nav-link"
              }
            >
              Add a pet
            </span>
          </li>

          <li className="mx-2">
            <span
              onClick={() => handlePageChange("FindPetPal")}
              className={
                currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
              }
            >
              Find pet pal
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
