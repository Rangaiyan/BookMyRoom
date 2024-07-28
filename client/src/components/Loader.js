import React, { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to dim the background
  };

  return (
    <div style={loaderStyle}>
      <FadeLoader color="#2F3645" loading={loading} size={60} />
    </div>
  );
}

export default Loader;

