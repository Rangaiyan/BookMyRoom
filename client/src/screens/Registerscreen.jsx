import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import "./Loginscreen.css"; // Import the same CSS for consistency

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to handle admin role

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, isAdmin };
      try {
        setLoading(true);
        await axios.post("/api/users/register", user);
        setLoading(false);
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
        setIsAdmin(false); // Reset isAdmin state

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
      console.log(user);
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div className="login-container">
      {loading && <Loader />}
      <div className="row justify-content-center align-items-center mb-5">
        <div className="col-md-6 login-form">
          <div className="card shadow-lg p-4">
            <h1 className="text-center mb-4">Register</h1>
            {error && <Error message="Registration failed" />}
            {success && <Success message="Registration successful" />}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-4"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <h5 className="text-left mb-5 " style={{marginRight:"200px"}}>
              Make as Admin :{" "}
              <button
                className="btn-primary btn"
                onClick={() => setIsAdmin(!isAdmin)}
              >
                {isAdmin ? "true" : "false"}
              </button>
            </h5>

            <button
              className="btn btn-primary btn-block mb-2  w-75"
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
