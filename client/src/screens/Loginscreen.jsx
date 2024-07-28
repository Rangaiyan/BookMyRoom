import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Loginscreen.css"; // Import custom CSS

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function Login() {
    const user = { email, password };

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const result = response.data;
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }

    console.log(user);
  }

  return (
    <div className="login-container ">
      {loading && <Loader />}
      <div className="row justify-content-center align-items-center   mb-5 ">
        <div className="col-md-6 login-form">
          <div className="card shadow-lg p-4">
            <h1 className="text-center mb-4">Login</h1>
            {error && <Error message="Invalid credentials" />}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary btn-block" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
