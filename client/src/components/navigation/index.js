// Navigation Component

// import React
import React from "react";
import '../../styles/Navigation.css';

// Navigation function
function Navigation({ currentPage, handlePageChange }) {
    return (
        <header className='header'>
            <h1 className="webTitle">Pinder: Puppy Love</h1>

            <nav>
                <ul className='btnContainer'>
                    <li className="mx-2 aboutBtn ">
                        <a onClick={() => handlePageChange('About')}
                        className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
                        >Homepage</a>
                    </li> 

                    <li className="mx-2 addPetBtn">
                        <span onClick={() => handlePageChange('AddPet')}
                        className={currentPage === 'AddPet' ? 'nav-link active' : 'nav-link'}>Add a pet</span>  
                    </li>

                    <li className="mx-2 findPetPalBtn">
                        <span onClick={() => handlePageChange('FindPetPal')}
                        className={currentPage === 'FindPetPal' ? 'nav-link active' : 'nav-link'}
                        >Find pet pal</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;
