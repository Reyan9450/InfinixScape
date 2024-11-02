import React, { useState, useEffect } from "react";
import "./ScrollView.css";

export const ScrollView = () => {
  const [loading, setLoading] = useState(false);
  const [scrollImages, setScrollImages] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
const fetchImages = async()=>{
    try{
        setLoading(true)
        const data= await fetch("https://localhost:5000/api/users/posts/page=1&limit=10",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        const result = await data.json();
        setScrollImages(result)
    }
    catch{
        console.log("error")
    }
} 
  }, []);
  console.log("REyans",scrollImages);
  

  const img1 = `https://picsum.photos/id/${page}/500/700`;

  const handleClick = () => {
    setPage(page + 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setPage(page + 1);
    } else if (event.key === "ArrowLeft" && page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [page]);

  return (
    <div className="scrollContainer">
      <img src={img1} onClick={handleClick} />
    </div>
  );
};