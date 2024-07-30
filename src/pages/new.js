import { useEffect, useState } from "react";
import { getAuthToken, removeAuthToken, isAuthenticated } from "../api/auth-provider";
import { API_PATH, UPLOADS_PATH } from "../api/vars";
import { Link, useParams } from "react-router-dom";
import { useCartContext } from "../api/provider";
import logo from '../Logo__1_-removebg-preview.png';

export default function NewDetail() {
  const { userData } = useCartContext();
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItem() {
      try {
        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };

        const get_user_response = await fetch(`${API_PATH}/news/${itemId}`, {
          method: 'GET',
          headers: headers,
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          setItem(get_user_data);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    async function fetchItems() {
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
          setItems(get_user_data);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchItem();
    fetchItems();
  }, [itemId]);


  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/account/login';
  };

  return (

    <>
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
      <div className="blog-single gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <article className="article">
                <div className="article-img">
                  <img src={`${UPLOADS_PATH}${item.image}`} title alt="" />
                </div>
                <div className="article-title">
                  <h2>{item.title}</h2>
                  <div className="media">
                    <div className="avatar">
                      <img src="https://ui-avatars.com/api/?name=For+MLM" title alt="" />
                    </div>
                    <div className="media-body">
                      <label>ForMLM</label>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="article-content">
                  <p>{item.description}</p>
                </div>
              </article>
            </div>
            <div className="col-lg-4 m-15px-tb blog-aside">
              {/* Latest Post */}
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Dernières actualités</h3>
                </div>
                <div className="widget-body">
                  {items.slice(0, 3).map(item => (
                    <div className="latest-post-aside media">
                      <div className="lpa-left media-body">
                        <div className="lpa-title">
                          <h5><Link to={`/news/${item.id}`}>{item.title}</Link></h5>
                        </div>
                        <div className="lpa-meta">
                          <Link className="name" to={`/news/${item.id}`}>
                            ForMLM
                          </Link>
                          <Link className="date" to={`/news/${item.id}`}>
                            {new Date(item.created_at).toLocaleDateString()}
                          </Link>
                        </div>
                      </div>
                      <div className="lpa-right">
                        <Link to={`/news/${item.id}`}>
                          <img src={`${UPLOADS_PATH}${item.image}`} title alt="" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End Latest Post */}
            </div>
          </div>
        </div>

        <style jsx>{`
.blog-listing {
    padding-top: 30px;
    padding-bottom: 30px;
}
/* Blog 
---------------------*/
.blog-grid {
  box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.blog-grid .blog-img {
  position: relative;
}
.blog-grid .blog-img .date {
  position: absolute;
  background: #1654D1;
  color: #ffffff;
  padding: 8px 15px;
  left: 10px;
  top: 10px;
  border-radius: 4px;
}
.blog-grid .blog-img .date span {
  font-size: 22px;
  display: block;
  line-height: 22px;
  font-weight: 700;
}
.blog-grid .blog-img .date label {
  font-size: 14px;
  margin: 0;
}
.blog-grid .blog-info {
  padding: 20px;
}
.blog-grid .blog-info h5 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 10px;
}
.blog-grid .blog-info h5 a {
  color: #1654D1;
}
.blog-grid .blog-info p {
  margin: 0;
}
.blog-grid .blog-info .btn-bar {
  margin-top: 20px;
}


/* Blog Sidebar
-------------------*/
.blog-aside .widget {
  box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  display: inline-block;
  vertical-align: top;
}
.blog-aside .widget-body {
  padding: 15px;
}
.blog-aside .widget-title {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.blog-aside .widget-title h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1654D1;
  margin: 0;
}
.blog-aside .widget-author .media {
  margin-bottom: 15px;
}
.blog-aside .widget-author p {
  font-size: 16px;
  margin: 0;
}
.blog-aside .widget-author .avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
}
.blog-aside .widget-author h6 {
  font-weight: 600;
  color: #1654D1;
  font-size: 22px;
  margin: 0;
  padding-left: 20px;
}
.blog-aside .post-aside {
  margin-bottom: 15px;
}
.blog-aside .post-aside .post-aside-title h5 {
  margin: 0;
}
.blog-aside .post-aside .post-aside-title a {
  font-size: 18px;
  color: #1654D1;
  font-weight: 600;
}
.blog-aside .post-aside .post-aside-meta {
  padding-bottom: 10px;
}
.blog-aside .post-aside .post-aside-meta a {
  color: #6F8BA4;
  font-size: 12px;
  text-transform: uppercase;
  display: inline-block;
  margin-right: 10px;
}
.blog-aside .latest-post-aside + .latest-post-aside {
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 15px;
}
.blog-aside .latest-post-aside .lpa-right {
  width: 90px;
}
.blog-aside .latest-post-aside .lpa-right img {
  border-radius: 3px;
}
.blog-aside .latest-post-aside .lpa-left {
  padding-right: 15px;
}
.blog-aside .latest-post-aside .lpa-title h5 {
  margin: 0;
  font-size: 15px;
}
.blog-aside .latest-post-aside .lpa-title a {
  color: #1654D1;
  font-weight: 600;
}
.blog-aside .latest-post-aside .lpa-meta a {
  color: #6F8BA4;
  font-size: 12px;
  text-transform: uppercase;
  display: inline-block;
  margin-right: 10px;
}

.tag-cloud a {
  padding: 4px 15px;
  font-size: 13px;
  color: #ffffff;
  background: #1654D1;
  border-radius: 3px;
  margin-right: 4px;
  margin-bottom: 4px;
}
.tag-cloud a:hover {
  background: #1654D1;
}

.blog-single {
  padding-top: 30px;
  padding-bottom: 30px;
}

.article {
  box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  padding: 15px;
  margin: 15px 0 30px;
}
.article .article-title {
  padding: 15px 0 20px;
}
.article .article-title h6 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
}
.article .article-title h6 a {
  text-transform: uppercase;
  color: #1654D1;
  border-bottom: 1px solid #1654D1;
}
.article .article-title h2 {
  color: #1654D1;
  font-weight: 600;
}
.article .article-title .media {
  padding-top: 15px;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 20px;
}
.article .article-title .media .avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
.article .article-title .media .media-body {
  padding-left: 8px;
}
.article .article-title .media .media-body label {
  font-weight: 600;
  color: #1654D1;
  margin: 0;
}
.article .article-title .media .media-body span {
  display: block;
  font-size: 12px;
}
.article .article-content h1,
.article .article-content h2,
.article .article-content h3,
.article .article-content h4,
.article .article-content h5,
.article .article-content h6 {
  color: #1654D1;
  font-weight: 600;
  margin-bottom: 15px;
}
.article .article-content blockquote {
  max-width: 600px;
  padding: 15px 0 30px 0;
  margin: 0;
}
.article .article-content blockquote p {
  font-size: 20px;
  font-weight: 500;
  color: #1654D1;
  margin: 0;
}
.article .article-content blockquote .blockquote-footer {
  color: #1654D1;
  font-size: 16px;
}
.article .article-content blockquote .blockquote-footer cite {
  font-weight: 600;
}
.article .tag-cloud {
  padding-top: 10px;
}

.article-comment {
  box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
  border-radius: 5px;
  overflow: hidden;
  background: #ffffff;
  padding: 20px;
}
.article-comment h4 {
  color: #1654D1;
  font-weight: 700;
  margin-bottom: 25px;
  font-size: 22px;
}
img {
    max-width: 100%;
}
img {
    vertical-align: middle;
    border-style: none;
}

/* Contact Us
---------------------*/
.contact-name {
  margin-bottom: 30px;
}
.contact-name h5 {
  font-size: 22px;
  color: #1654D1;
  margin-bottom: 5px;
  font-weight: 600;
}
.contact-name p {
  font-size: 18px;
  margin: 0;
}

.social-share a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
  margin-right: 10px;
}
.social-share .dribbble {
  box-shadow: 0 8px 30px -4px rgba(234, 76, 137, 0.5);
  background-color: #ea4c89;
}
.social-share .behance {
  box-shadow: 0 8px 30px -4px rgba(0, 103, 255, 0.5);
  background-color: #0067ff;
}
.social-share .linkedin {
  box-shadow: 0 8px 30px -4px rgba(1, 119, 172, 0.5);
  background-color: #0177ac;
}

.contact-form .form-control {
  border: none;
  border-bottom: 1px solid #1654D1;
  background: transparent;
  border-radius: 0;
  padding-left: 0;
  box-shadow: none !important;
}
.contact-form .form-control:focus {
  border-bottom: 1px solid #1654D1;
}
.contact-form .form-control.invalid {
  border-bottom: 1px solid #ff0000;
}
.contact-form .send {
  margin-top: 20px;
}
@media (max-width: 767px) {
  .contact-form .send {
    margin-bottom: 20px;
  }
}

.section-title h2 {
    font-weight: 700;
    color: #1654D1;
    font-size: 45px;
    margin: 0 0 15px;
    border-left: 5px solid #1654D1;
    padding-left: 15px;
}
.section-title {
    padding-bottom: 45px;
}
.contact-form .send {
    margin-top: 20px;
}
.px-btn {
    padding: 0 50px 0 20px;
    line-height: 60px;
    position: relative;
    display: inline-block;
    color: #1654D1;
    background: none;
    border: none;
}
.px-btn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 30px;
    background: transparent;
    border: 1px solid rgba(252, 83, 86, 0.6);
    border-right: 1px solid transparent;
    -moz-transition: ease all 0.35s;
    -o-transition: ease all 0.35s;
    -webkit-transition: ease all 0.35s;
    transition: ease all 0.35s;
    width: 60px;
    height: 60px;
}
.px-btn .arrow {
    width: 13px;
    height: 2px;
    background: currentColor;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 25px;
}
.px-btn .arrow:after {
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-top: 2px solid currentColor;
    content: "";
    position: absolute;
    top: -3px;
    right: 0;
    display: inline-block;
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

      `}</style>
      </div>
    </>
  );
};