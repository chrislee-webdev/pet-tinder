// import React, { useState } from "react";
// import Navigation from "../Navigation/nav";
// import AddPet from "../AddPet";
// import FindPetPal from "../FindPetPal";
// import About from "../About";
// import Footer from "../Footer";
// import Contact from "../Contact";
// import { LikedPets } from "../LikedPets";
// import LoginPage from "../LoginPage/LoginPage";
// import auth from "../../utils/auth";
// import { Navigate, Route, Routes } from "react-router-dom";
// import "../../styles/Title.css";

// export default function PortfolioContainer() {
//   const [currentPage, setCurrentPage] = useState("About");

//   const renderPage = () => {
//     if (currentPage === "About") {
//       return <About />;
//     }
//     if (currentPage === "AddPet") {
//       return <AddPet />;
//     }
//     if (currentPage === "FindPetPal") {
//       return <FindPetPal />;
//     }
//     if (currentPage === "Login") {
//       return <LoginPage />;
//     }
//     if (currentPage === "Contact") {
//       return <Contact />;
//     }
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <main>
//       <Navigation
//         currentPage={currentPage}
//         handlePageChange={handlePageChange}
//       />
//       <Routes>
//         <Route path="/" element={<About />} />
//         <Route
//           path="/add-pet"
//           element={auth.loggedIn() ? <AddPet /> : <Navigate replace to="/" />}
//         />
//         <Route path="/find-pet-pal" element={<FindPetPal />} />
//         <Route
//           path="/my-likes"
//           element={
//             auth.loggedIn() ? <LikedPets /> : <Navigate replace to="/" />
//           }
//         />
//         <Route path="/login" element={<LoginPage />} />

//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//       <footer>
//         <Footer></Footer>
//       </footer>
//     </main>
//   );
// }

import React, { useState } from "react";
import Navigation from "../Navigation/nav";
import AddPet from "../AddPet";
import FindPetPal from "../FindPetPal";
import About from "../About";
import Footer from "../Footer";
import Contact from "../Contact";
import { LikedPets } from "../LikedPets";
import LoginPage from "../LoginPage/LoginPage";
import auth from "../../utils/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import Title from "../Title/title";

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
    if (currentPage === "Contact") {
      return <Contact />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <main>
      <Navigation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <Title />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/find-pet-pal" element={<FindPetPal />} />
        <Route
          path="/my-likes"
          element={
            auth.loggedIn() ? <LikedPets /> : <Navigate replace to="/" />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer>
        <Footer></Footer>
      </footer>
    </main>
  );
}
