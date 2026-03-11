import React, { useState } from "react";
import GradientText from "../reactbits/GradientText";
import { URL } from "../Constants";
import Responses from "./Responses";

export default function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      const data = await res.json();

      // safety check
      if (data?.candidates?.length > 0) {

        let dataString =
          data.candidates[0].content.parts[0].text;

        dataString = dataString
          .split("* ")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        setChatResponse(dataString);

      } else {
        console.log("Unexpected response:", data);
      }

    } catch (error) {
      console.log("Error generating response:", error);
    }

    setLoading(false);
  };

  return (
    <div className="chat-content">

      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class"
      >
        Chat with AI
      </GradientText>

      <div className="output">
        <ul>
          {chatResponse.map((item, index) => (
            <li key={index}>
              <Responses ans={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="input-button">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for AI"
        />

        <button onClick={askAI} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

    </div>
  );
}