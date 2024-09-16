import React, { useState, useRef } from "react";
import './ImageGen.css'
import img1 from '../ImageGen/img1.webp'

const ImageGen = () => {
    const [image_url, setImage_url] = useState(img1);
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value===""){
            return;
        }
        
        const response = await fetch(
            "https://api.openai.com/v1/images/generations" , 
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : 
                "Bearer YOUR_API", 
                "User-Agent" : "Chrome",
            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"512x512",
            }),
        }

    );
    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }

    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    
    }


    return (
    <div className="ai-image-gen">
        <div className="header">AI Image <span>Generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"? img1 : image_url} alt=""/></div>
        </div>
     <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see."/>
        <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
     </div>
    </div>
)
}

export default ImageGen;