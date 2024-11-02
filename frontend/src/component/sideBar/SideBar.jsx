import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlay, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './sideBar.css';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext/authContext';// Adjust the path as needed

export const SideBar = (props) => {
    const { logout } = useContext(AuthContext); // Get the logout function from AuthContext

    const handleLogout = () => {
        logout(); // Call the logout function from context
        localStorage.removeItem('user'); // Clear user data from local storage
        // Optionally, redirect the user or update the UI
        // For example: window.location.reload(); to refresh the page
    };

    return (
        <>
            <div className="sideContainer">
                <div className="firstHalf">
                    <button className="iconBtn" onClick={() => props.handletoggle("homePage")}>
                        <FontAwesomeIcon icon={faHome} /> {/* Home Icon */}
                    </button>
                    <button className="iconBtn" onClick={() => props.handletoggle("infiniteWindow")}>
                        <FontAwesomeIcon icon={faPlay} /> {/* Play Icon */}
                    </button>
                </div>
                <div className="secondHalf">
                    <button className="iconBtn" onClick={handleLogout}> {/* Attach handleLogout to the button */}
                        <FontAwesomeIcon icon={faSignOutAlt} /> {/* Logout Icon */}
                    </button>
                </div>
            </div>
        </>
    );
}
