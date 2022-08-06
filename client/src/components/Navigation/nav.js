// Navigation Component

// import React
import React from "react";
import { Link } from "react-router-dom";
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
                className={
                  currentPage === "Login" ? "nav-link active" : "nav-link"
                }
              >
                Login/Signup
              </Link>
            )}{" "}
          </li>

          <li className="mx-2">
            <Link
              to={"/"}
              onClick={() => handlePageChange("About")}
              className={
                currentPage === "About" ? "nav-link active" : "nav-link"
              }
            >
              Homepage
            </Link>
          </li>

          <li className="mx-2">
            <Link
              to={"/add-pet"}
              onClick={() => handlePageChange("AddPet")}
              className={
                currentPage === "AddPet" ? "nav-link active" : "nav-link"
              }
            >
              Add a pet
            </Link>
          </li>

          <li className="mx-2">
            <Link
              to={"find-pet-pal"}
              onClick={() => handlePageChange("FindPetPal")}
              className={
                currentPage === "FindPetPal" ? "nav-link active" : "nav-link"
              }
            >
              Find pet pal
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
