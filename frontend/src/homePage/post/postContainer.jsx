import './post.css';
import React, { useState, useEffect } from 'react';

export const PostContainer = () => {
    const [posts, setPosts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {    
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await fetch(`http://localhost:5000/api/users/posts/${user._id}`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET',
                });
                const data = await response.json();
                setPosts(data);
             
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);
    // console.log("my post",posts[0].imageUrl);
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Store the selected file
    };

    const handleUpload = async () => {
        console.log("Uploading file");
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }
        
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const formData = new FormData();
            formData.append('image', selectedFile); // Append file data to FormData
            formData.append('userId', user._id);

            const response = await fetch('http://localhost:5000/api/upload/', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                const newPost = await response.json();
                setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to posts list
                setSelectedFile(null); // Clear the file input
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="postContainer">
            {/* File input and upload button */}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {/* Display posts */}
            {posts.map((post) => (
                <div key={post._id} className="post"> {/* Add unique key here */}
                    <img src={`http://localhost:5000/${post.imageUrl}`} alt={`Post ${post._id}`} />
                </div>
            ))}
        </div>
    );
};
