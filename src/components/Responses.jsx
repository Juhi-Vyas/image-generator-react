import React from "react";
import ReactMarkdown from "react-markdown";
import '../styles/Response.css'

export default function Responses({ ans }) {

  if (ans.type === "q") {
    return (
      <div className="question">
        {ans.text}
      </div>
    );
  }

  return (
    <div className="answer">
      <div className="markdown">
        <ReactMarkdown>{ans.text}</ReactMarkdown>
      </div>
    </div>
  );
}