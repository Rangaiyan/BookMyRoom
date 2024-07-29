// import React, { useState } from "react";
// import axios from "axios";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import Success from "../components/Success";
// import "./Loginscreen.css"; // Import the same CSS for consistency

// function Registerscreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword, setCpassword] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false); // State to handle admin role

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);

//   async function register() {
//     if (password === cpassword) {
//       const user = { name, email, password, isAdmin };
//       try {
//         setLoading(true);
//         await axios.post("/api/users/register", user);
//         setLoading(false);
//         setSuccess(true);
//         setName("");
//         setEmail("");
//         setPassword("");
//         setCpassword("");
//         setIsAdmin(false); // Reset isAdmin state

//         // Clear success message after 3 seconds
//         setTimeout(() => {
//           setSuccess(false);
//         }, 3000);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//         setError(true);
//       }
//       console.log(user);
//     } else {
//       alert("Passwords do not match");
//     }
//   }

//   return (
//     <div className="login-container">
//       {loading && <Loader />}
//       <div className="row justify-content-center align-items-center mb-5">
//         <div className="col-md-6 login-form">
//           <div className="card shadow-lg p-4">
//             <h1 className="text-center mb-4">Register</h1>
//             {error && <Error message="Registration failed" />}
//             {success && <Success message="Registration successful" />}
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               className="form-control mb-3"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               className="form-control mb-4"
//               placeholder="Confirm Password"
//               value={cpassword}
//               onChange={(e) => setCpassword(e.target.value)}
//             />
//             <h5 className="text-left mb-5 " style={{marginRight:"200px"}}>
//               Make as Admin :{" "}
//               <button
//                 className="btn-primary btn"
//                 onClick={() => setIsAdmin(!isAdmin)}
//               >
//                 {isAdmin ? "true" : "false"}
//               </button>
//             </h5>

//             <button
//               className="btn btn-primary btn-block mb-2  w-75"
//               onClick={register}
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Registerscreen;



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

  async function register(e) {
    e.preventDefault();
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
    <section className="vh-100" style={{ backgroundColor: "#F0ECE5" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                    <form className="mx1 mx-md-2" onSubmit={register}>
                      {loading && <Loader />}
                      {error && <Error message="Registration failed" />}
                      {success && <Success message="Registration successful" />}

                      <div className="d-flex flex-row align-items-center mb-1">
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example1c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-1">
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example3c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-1">
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example4c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-1">
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            placeholder="Repeat your password"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example4cd"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="roleOptions"
                            id="userRole"
                            value="user"
                            checked={!isAdmin}
                            onChange={() => setIsAdmin(false)}
                          />
                          <label className="form-check-label" htmlFor="userRole">User</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="roleOptions"
                            id="adminRole"
                            value="admin"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(true)}
                          />
                          <label className="form-check-label" htmlFor="adminRole">Admin</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registerscreen;
