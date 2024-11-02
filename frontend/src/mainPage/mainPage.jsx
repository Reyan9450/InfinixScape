import { NavBar } from '../component/navBar/NavBar';
import { SideBar } from '../component/sideBar/SideBar';
import './mainPage.css';
import { useState } from 'react';
import { HomePage } from '../homePage/HomePage';
import { InfiniteWindow } from '../infinteScroll/infiniteWindow.jsx';

export const MainPage = () => {
    const [currentPage, setCurrentPage] = useState('homePage'); // Store current page as a string

    // Handle toggle between HomePage and InfiniteWindow
    const handletoggle = (page) => {
        setCurrentPage(page); // Set the page directly
    }

    return (
        <>
            <div className="mainContainer">
                <NavBar />
                <div className="subContainer">
                    <SideBar handletoggle={handletoggle} /> {/* Pass handletoggle to SideBar */}

                    {/* Conditionally render based on the currentPage value */}
                    {currentPage === 'infiniteWindow' ? <InfiniteWindow /> : <HomePage />}
                </div>
            </div>
        </>
    )
}
