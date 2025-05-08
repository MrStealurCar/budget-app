import React from "react";
import "./DetailedView.css";
function DetailedView({ item, setViewId }) {
  return (
    <div>
      <span className="entry-details">
        <span>ID: {item.id},</span>
        <span>Title: {item.title},</span>
        <span>Budget: ${item.budget}</span>
      </span>
      <button
        className="close-button"
        onClick={() => {
          setViewId(null);
        }}
      >
        Close
      </button>
    </div>
  );
}

export default DetailedView;
