import React, { useState } from "react";

function DetailedView({ item, setViewId }) {
  return (
    <div>
      <ul>
        <li>ID: {item.id}</li>
        <li>Title: {item.title}</li>
        <li>Budget: {item.budget}</li>
      </ul>
      <button
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
