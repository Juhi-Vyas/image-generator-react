import React, { useState } from 'react'
import GradientText  from '../reactbits/GradientText';

export default function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const askAI = async () => {
        try {
            await fetch(``);
            const urls = await Response.json();
            setImageUrls(urls);
        } catch (error) {
            console.log("Error generating image: ", error)
        }
    }

return (
    <div className='chat-content'>
    <GradientText
      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
      animationSpeed={3}
      showBorder={false}
      className="custom-class"
    >
      Chat with AI
    </GradientText>

    <div className='input-button'>
    <input 
    type="text"
    value={prompt} 
    onChange={(e) => setPrompt(e.target.value)}
    placeholder='Enter a prompt for AI'
    />
    <button onChange={askAI}>Ask</button>
    </div>

    <div className='output'>
        <p>{chatResponse}</p>
    </div>
    </div>
)
}
