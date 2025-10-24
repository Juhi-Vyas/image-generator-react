import React, { useState } from 'react';
import GradientText  from '../reactbits/GradientText';


function ImageGenerator() {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    const generateImage = async () => {
        try {
            const response = await fetch(``);
            const urls = await Response.json();
            setImageUrls(urls);
        } catch (error) {
            console.log("Error generating image: ", error)
        }

    }
return (
    <div className='tab-content'>
    <GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Generate Image
</GradientText>

<div className='input-button'>
<input 
    type="text" 
    value={prompt} 
    onChange={(e) => setPrompt(e.target.value)}
    placeholder='Enter prompt for image'
    />
    <button onClick={generateImage}>Generate</button>
</div>
    
    <div className='image-grid'>
        {imageUrls.map((url, index) => (
            <div className="image-wrapper" key={index}>
            <img src={url} alt={`Generated ${index}`} />
            <a className="download-btn" href={url} download target="_blank" rel="noopener noreferrer">
                ⬇ Download
            </a>
        </div>))}
        {[...Array(4 - imageUrls.length)].map((_, index) => (
            <div key={index + imageUrls.length} className='empty-image-slot'></div>
        ))}
    </div>
    </div>
)
}

export default ImageGenerator
