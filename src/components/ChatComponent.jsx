import React, { useState, useEffect, useRef } from "react";
import { URL } from "../Constants";
import Responses from "./Responses";
import Sidebar from "./Sidebar";

export default function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    setRecentHistory(history);
  }, []);

  const askAI = async () => {
    if (!prompt.trim()) return;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = [prompt, ...history];
    localStorage.setItem("history", JSON.stringify(history));
    setRecentHistory(history);

    try {
      setLoading(true);

      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();

      if (data?.candidates?.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;

        setChatResponse((prev) => [
          ...prev,
          { type: "q", text: prompt },
          { type: "a", text: aiResponse },
        ]);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }

    setPrompt("");

    setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 300);
  };

  function deleteHistory(index) {
    let updated = recentHistory.filter((item, i) => i !== index);
    setRecentHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  }

  return (
    <div className="chat-content">
      <div className="left-section">
        <Sidebar recentHistory={recentHistory} deleteHistory={deleteHistory} />
      </div>

      <div className="right-section">
        <div className="output" ref={scrollRef}>
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
            placeholder="Enter a prompt for AI"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") askAI();
            }}
          />

          <button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
}