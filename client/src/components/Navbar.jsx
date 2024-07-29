import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div className="na" style={{ backgroundColor: '#180161' }}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000000' }}>
        <a className="navbar-brand text-white pl-4" href="/home">
          BookMyRoom
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-secondary text-white border-0"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ backgroundColor: 'black', paddingRight: '10px' }}
                  >
                    <i className="fa fa-user p-2"></i> {user.name}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                    {user.isAdmin && (
                      <a className="dropdown-item" href="/admin">
                        Admin Panel
                      </a>
                    )}
                    <a className="dropdown-item" href="#" onClick={logout}>
                      <i className="fa fa-share-square-o"></i> Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
