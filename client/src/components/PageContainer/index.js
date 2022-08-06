import React, { useState } from "react";
import Navigation from "../Navigation";
import AddPet from "../AddPet";
import FindPetPal from "../FindPetPal";
import About from "../About";
import Footer from "../Footer";
import { LikedPets } from "../LikedPets";
import LoginPage from "../logintemp/LoginPage";
import auth from "../../utils/auth";
import { Route, Routes } from "react-router-dom";

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("About");

  const renderPage = () => {
    if (currentPage === "About") {
      return <About />;
    }
    if (currentPage === "AddPet") {
      return <AddPet />;
    }
    if (currentPage === "FindPetPal") {
      return <FindPetPal />;
    }
    if (currentPage === "Login") {
      return <LoginPage />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <main>
      <Navigation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/find-pet-pal" element={<FindPetPal />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <footer>
        <Footer></Footer>
      </footer>
    </main>
  );
}
