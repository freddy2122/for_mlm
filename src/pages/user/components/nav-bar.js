import React from "react";
import { Link } from "react-router-dom";
import { removeAuthToken } from "../../../api/auth-provider";
import logo from '../../../Logo__1_-removebg-preview.png';
import { useCartContext } from "../../../api/provider";


export default function FindNavBar() {
  const { cartItems, userData } = useCartContext();
  const totalItemsInCart = cartItems.length;
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const slug = urlParts[3];
  // console.log(slug)
  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/account/login';
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm d-md-none">
        <div className="container">
          <Link href="/" class="navbar-brand d-flex align-items-center">
            <img src={logo} className="" width="80" height="80" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/recherche-de-stockiste" className="nav-link active text-dark" aria-current="page">
                  Rechercher un stockiste
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recherche-de-produits" className="nav-link text-dark">
                  Rechercher un produits
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recherche-de-produits" className="nav-link text-dark">
                  Rechercher un
                  pack d’adhésion
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link btn border mb-2">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span className="badge" style={{ color: '#6F6F6F' }}>{totalItemsInCart}</span>
                </Link>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger border text-white">
                  <span className="badge" style={{ color: '#fff' }}>Déconnexion</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header data-bs-theme="dark" className=" d-md-block d-none">
        <div class="navbar navbar-light bg-white shadow-sm">
          <div class="container">
            <Link href="/" class="navbar-brand d-flex align-items-center">
              <img src={logo} className="" width="80" height="80" alt="logo" />
            </Link>
            <div>

              <Link to="/cart" className="btn border ml-2">
                <i className="fas fa-shopping-cart text-primary"></i>
                <span className="badge" style={{ color: '#6F6F6F' }}>{totalItemsInCart}</span>
              </Link>

              {userData.type_account === 'stockist' ? null :
                <>
                  {/* {slug === 'recherche-de-produits' && */}
                  <Link to="/recherche-de-stockiste" className="btn border ml-2">
                    <span className="badge" style={{ color: '#6F6F6F' }}>Rechercher un stockiste</span>
                    {/* <i className="fas fa-search text-primary"></i> */}
                  </Link>
                  {/* } */}

                  <Link to="/recherche-de-produits" className="btn border ml-2">
                    <span className="badge" style={{ color: '#6F6F6F' }}>Rechercher un produits</span>
                  </Link>
                  <Link to="/recherche-de-produits" className="btn border ml-2">
                    <span className="badge" style={{ color: '#6F6F6F' }}>     Rechercher un
                      pack d’adhésion</span>
                  </Link>
                </>
              }
              <a onClick={handleLogout} class="btn btn-danger border text-white ml-2" aria-current="page">
                Déconnexion
              </a>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}