import React from "react";

export default function Comment({ title, name, body }) {
  return (
    <div
      className='comment'
      style={{ border: "1px solid black", background: "#ebebeb" }}>
      <h5>{title}</h5>
      <p>{body}</p>
      <h6>By {name}</h6>
    </div>
  );
}