import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the plus icon
import './profile.css';

export const ProfileContainer = () => {
    const [userData, setUserData] = useState(null); // State to store user data

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get user data from localStorage
                const userData = localStorage.getItem('user');
                const id = JSON.parse(userData)._id;

                // Fetch user data using the user ID
                const response = await fetch(`https://infinixscape-1.onrender.com/api/users/${id}`, {

                    credentials: 'include', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, // Include cookies

                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                // console.log("My data",data[0]);
                setUserData(data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Log the user data for debugging purposes
    console.log(userData);

    return (
        <div className="profileContainer">
            <div className='section1'>
                {/* Image source dynamically set from userData */}
                <div className='imageContainer'>
                    <img 
                        src={userData?.profilePic || "defaultImage.jpg"} // Fallback to a default image if not available
                        alt="Profile" 
                        width={200} 
                        height={200} 
                    />
                </div>

                {/* FontAwesomeIcon imported and used here */}
                <button className='plusBtn'>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className='section2'>
                <div>
                    <p>User ID: {userData?.userName || "N/A"}</p>
                    <button>Edit profile</button>
                </div>
                <div>
                    <p>Followers: {userData?.followers?.length || 0}</p>
                    <p>Following: {userData?.following?.length || 0}</p>
                    <p>Posts: {userData?.posts?.length || 0}</p> {/* Assuming posts will be an array */}
                </div>
                <div>
                    <p>Name: {userData?.fullname || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};
