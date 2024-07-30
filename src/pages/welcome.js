import React, { useEffect, useState } from 'react';
import logo from '../Logo__1_-removebg-preview.png';
import { Link } from 'react-router-dom';
import { getAuthToken, isAuthenticated, removeAuthToken } from '../api/auth-provider';
import { useCartContext } from '../api/provider';
import axios from 'axios';
import { API_PATH, UPLOADS_PATH } from '../api/vars';

const Welcome = () => {
  const { userData } = useCartContext();
  const [slides, setSlides] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };

        const get_user_response = await fetch(`${API_PATH}/slides`, {
          method: 'GET',
          headers: headers,
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          setSlides(get_user_data.slides);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    async function fetchNews() {
      try {
        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };

        const get_user_response = await fetch(`${API_PATH}/news`, {
          method: 'GET',
          headers: headers,
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          setNews(get_user_data);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchNews();
    fetchData();
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/account/login';
  };

  return (
    <>
      {/* Main Navigation */}
      <header data-bs-theme="dark" className='d-md-block d-none'>
        <div className="navbar navbar-light  shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src={logo} width="80" height="80" alt="logo" />
            </Link>
            <div>
              {isAuthenticated() ? (
                userData?.type_account === 'stockist' ? (
                  <Link to="/store-manager" className="btn btn-primary" aria-current="page">
                    Tableau de bord <i className="bi bi-person-circle"></i>
                  </Link>
                ) : (
                  <>
                    <Link to="/recherche-de-produits" className="btn btn-primary" aria-current="page">
                      Trouver un produit
                    </Link>
                    <Link to="/recherche-de-stockiste" className="btn btn-primary ml-2" aria-current="page">
                      Trouver un stockist
                    </Link>
                    <a onClick={handleLogout} className="btn btn-danger border ml-2" aria-current="page">
                      Déconnexion
                    </a>
                  </>
                )
              ) : (
                <Link to="/account/login" className="btn btn-primary" aria-current="page">
                  Connexion <i className="bi bi-person-circle"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <header data-bs-theme="dark" className='d-md-none'>
        <div className="navbar navbar-light  shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src={logo} width="80" height="80" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">For MLM</h5>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="offcanvas" aria-label="Close">
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  {isAuthenticated() ? (
                    userData?.type_account === 'stockist' ? (
                      <li className="nav-item">
                        <Link to="/store-manager" className="btn btn-primary w-100" aria-current="page">
                          Tableau de bord <i className="bi bi-person-circle"></i>
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li className="nav-item">
                          <Link to="/recherche-de-produits" className="btn btn-primary w-100 me-0" aria-current="page">
                            Trouver un produit
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/recherche-de-stockiste" className="btn btn-primary w-100 my-2 me-0" aria-current="page">
                            Trouver un stockist
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a onClick={handleLogout} className="btn btn-danger w-100" aria-current="page">
                            Déconnexion
                          </a>
                        </li>
                      </>
                    )
                  ) : (
                    <li className="nav-item">
                      <Link to="/account/login" className="btn btn-primary w-100" aria-current="page">
                        Connexion <i className="bi bi-person-circle"></i>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main>

        <div className='container'>
          <div className="row g-5">
            <div className="col-md-8">
              <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {slides.map((slide, index) => (
                    <div key={slide.image_large} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ backgroundImage: `url(${UPLOADS_PATH + slide.image_small})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: 500 }}>
                      {/* Optional: Content inside slide if needed */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <div>
                  <h4 className="fst-italic">Recent posts</h4>
                  <ul className="list-unstyled">
                    {news.slice(0, 3).map(item => (
                      <li key={item.id}>
                        <Link className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top" to={`/news/${item.id}`}>
                          <img src={`${UPLOADS_PATH}${item.image}`} alt='' className="bd-placeholder-img" width={96} height={96} />
                          <div className="col-lg-8">
                            <h6 className="mb-2 text-dark font-bold" style={{ fontWeight: 'bold', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{item.title}</h6>
                            <small className="text-body-secondary text-dark" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                              {item.description}
                            </small>
                            <small className="text-body-secondary text-dark">
                              {new Date(item.created_at).toLocaleDateString()}
                            </small>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="container mt-5">
          <hr className="my-5" />
          {/* Section: Content */}
          <div className="row people text-center py-5">
            <div className="col-md-6 col-lg-3 py-lg-0 py-md-3 py-3 item">
              <div className="box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#0132b9", borderRadius: '20px', height: '100%', padding: 20 }}>
                <h5 className="text-white">Trouver un produit</h5>
                <p className="description text-white">Chers partenaires, vérifiez la disponibilité des produits Longrich et les différents packs d’adhésion auprès d’un stockiste dans une zone donnée.</p>
                <div>
                  <Link className='btn px-5' style={{ backgroundColor: "wheat", fontWeight: 'bold', borderRadius: '20px', color: '#0132b9' }} to={'/account/register?type=recherche-de-produits'}>Rechercher</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-lg-0 py-md-3 py-3 item">
              <div className="box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#0132b9", borderRadius: '20px', height: '100%', padding: 20 }}>
                <h5 className="text-white">Trouver un pack d’adhésion</h5>
                <p className="description text-white">Chers partenaires, consultez les différents packs d’adhésion Longrich auprès d’un stockiste dans une zone désirée.</p>
                <div>
                  <Link className='btn px-5' style={{ backgroundColor: "wheat", fontWeight: 'bold', borderRadius: '20px', color: '#0132b9' }} to={'/account/register?type=recherche-de-stockiste'}>Rechercher</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-lg-0 py-md-3 py-3 item">
              <div className="box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#0132b9", borderRadius: '20px', height: '100%', padding: 20 }}>
                <h5 className="text-white">Trouver un stockiste</h5>
                <p className="description text-white">Chers partenaires, rentrez directement en contact avec un stockiste Longrich pour l’exécution d’une nouvelle commande ou l’adhésion d’un nouveau filleul</p>
                <div>
                  <Link className='btn px-5' style={{ backgroundColor: "wheat", fontWeight: 'bold', borderRadius: '20px', color: '#0132b9' }} to={'/account/register?type=recherche-de-stockiste'}>Rechercher</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-lg-0 py-md-3 py-3 item">
              <div className="box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "#0132b9", borderRadius: '20px', height: '100%', padding: 20 }}>
                <h5 className="text-white">Créer votre Boutique Stockiste</h5>
                <p className="description text-white">Chers Stockistes LONGRICH, insérez facilement vos produits en ligne pour accélérer vos ventes et booster votre chiffre d’affaires le plus rapidement possible.</p>
                <div>
                  <Link className='btn px-5' style={{ backgroundColor: "wheat", fontWeight: 'bold', borderRadius: '20px', color: '#0132b9' }} to={'/account/register?type=stockist'}>Créer</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Main layout */}
      {/* Footer */}
      <footer className="bg-light text-lg-start">
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    </>
  );
};

export default Welcome;
