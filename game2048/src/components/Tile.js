import React from "react";

export default function Tile({ value }) {
  return (
    <div className={`tile tile-${value}`}>
      {value !== 0 ? value : ""}
    </div>
  );
}
