import React, { useState } from "react";
import Navigation from "../Navigation";
import AddPet from "../AddPet";
import FindPetPal from "../FindPetPal";
import About from "../About";
import Footer from "../Footer";

export default function PortfolioContainer() {
    const [currentPage, setCurrentPage] = useState('About');
  
    const renderPage = () => {
      if (currentPage === 'About') {
        return <About />;
      }
      if (currentPage === 'AddPet') {
        return <AddPet />;
      }
      if (currentPage === 'FindPetPal') {
        return <FindPetPal />
      }
    };
  
    const handlePageChange = (page) => setCurrentPage(page);
  
    return (
      <main>
        <Navigation currentPage={currentPage} handlePageChange={handlePageChange} />
        {renderPage()}
        <footer>
          <Footer></Footer>
        </footer>
      </main>

    );
  }
  