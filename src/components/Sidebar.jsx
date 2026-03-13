import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { MdDeleteOutline } from "react-icons/md";

function Sidebar({ recentHistory, deleteHistory }) {
  const [selectedHistory, setSelectedHistory] = useState("")

  useEffect(() => {
    console.log(selectedHistory)
  
  }, [selectedHistory])
  
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Recent searches</h4>
      <ul>
        {recentHistory &&
          recentHistory.map((item, index) => (
            <li key={index} className="history-item" 
            onClick={()=>setSelectedHistory(item)}
            >
              <span className="history-text" title={item}>
                {item}
              </span>

              <span className="menu-dots" onClick={() => deleteHistory(index)}><MdDeleteOutline /></span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Sidebar;