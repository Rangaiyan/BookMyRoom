// import React, { useState } from "react";
// import axios from "axios";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import "./Loginscreen.css"; // Import custom CSS

// function Loginscreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   async function Login() {
//     const user = { email, password };

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/login", user);
//       const result = response.data;
//       setLoading(false);
//       localStorage.setItem("currentUser", JSON.stringify(result));
//       window.location.href = "/home";
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setError(true);
//     }

//     console.log(user);
//   }

//   return (
//     <div className="login-container ">
//       {loading && <Loader />}
//       <div className="row justify-content-center align-items-center   mb-5 ">
//         <div className="col-md-6 login-form">
//           <div className="card shadow-lg p-4">
//             <h1 className="text-center mb-4">Login</h1>
//             {error && <Error message="Invalid credentials" />}
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               className="form-control mb-4"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button className="btn btn-primary btn-block" onClick={Login}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loginscreen;


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

  async function Login(e) {
    e.preventDefault();
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
  }

  return (
    <section className="vh-100" style={{backgroundColor:"#F0ECE5"}}>
      <div className="container py- h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={Login}>
              {loading && <Loader />}
              {error && <Error message="Invalid credentials" />}
            <h1 className="mb-4">Login </h1>
              <div data-mdb-input-init className="form-outline mb-1">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example13"></label>
              </div>

              <div data-mdb-input-init className="form-outline mb-2">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form1Example23"></label>
              </div>


              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Sign in</button>

            
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loginscreen;

