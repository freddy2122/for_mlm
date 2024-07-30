import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCartContext } from '../../api/provider';
import { useCustomization } from '../../api/theme-context';
import { removeAuthToken } from '../../api/auth-provider';
import { UPLOADS_PATH } from '../../api/vars';
import Footer from '../../pages/user/components/footer';



export default function UserDashboardLayout({ children }) {
  const { userData, cartItems } = useCartContext();
  const totalItemsInCart = cartItems.length;
  const [active, setActive] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const { logoColor, topBarColor, sideBarColor, backgroundColor } = useCustomization();
  const urlActuelle = window.location.pathname;
  const handleActive = () => {
    setActive(!active)
  }
  const handleActiveNav = () => {
    setActiveNav(!activeNav)
  }
  const getLogoSource = () => {
    return logoColor !== 'white' ? 'Logo__2.png' : 'Logo__1_-removebg-preview.png';
  };
  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/account/login';
  };

  return (
    <>
      <div className="wrapper">
        <div className="main-header">
          {/* Logo Header */}
          <div className="logo-header" data-background-color={logoColor}>
            <Link to="/" className="logo">
              <img
                src={`/img/${getLogoSource()}`}
                alt="navbar brand"
                className="navbar-brand"
                width={60}
              />
            </Link>
            <button
              className="navbar-toggler sidenav-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleActive}
            >
              <span className="navbar-toggler-icon">
                <i className="bi bi-list" />
              </span>
            </button>
            <button className="topbar-toggler more" onClick={handleActiveNav}>
              <i className="bi bi-three-dots-vertical" />
            </button>

          </div>
          {/* End Logo Header */}


          {/* Navbar Header */}
          <nav
            className={`navbar navbar-header navbar-expand-lg ${activeNav && 'navbar-header-active'}`}
            data-background-color={topBarColor}
          >
            <div className="container-fluid">
              {/* <div className="collapse" id="search-nav">
                <div className="navbar-left navbar-form nav-search mr-md-3">
                  <h2 className="text-white fw-bold">Gérer votre boutique</h2>
                </div>
              </div> */}
              <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">


                <li className="nav-item dropdown hidden-caret">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/cart"
                    id="notifDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-cart-plus" />
                    <span className="notification">{totalItemsInCart}</span>
                  </Link>
                </li>

                <li className="nav-item dropdown hidden-caret">
                  <div className="dropdown">
                    <div className="avatar-sm" data-bs-toggle="dropdown" aria-expanded="false">
                      <img
                        src={userData?.profile_image ? UPLOADS_PATH + userData?.profile_image : '/img/user-4-fill.svg'}
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/parametres">Paramètres</Link></li>
                      <li><a className="dropdown-item text-danger cursor-pointer" onClick={handleLogout}>Déconnexion</a></li>
                    </ul>
                  </div>

                </li>
              </ul>
            </div>
          </nav>
          {/* End Navbar */}


        </div>



        {/* Sidebar */}
        <div className={`sidebar sidebar-style-2 ${active && 'sidebar-active-style-2'}`} data-background-color={sideBarColor}>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">

              <ul className="nav nav-primary">
                <li className={`nav-item ${urlActuelle === '/recherche-de-stockiste' ? 'active' : ''}`}>
                  <Link to="/recherche-de-stockiste">
                    <i className="fas fa-th-list" />
                    <p>Rechercher un stockiste</p>
                  </Link>
                </li>
                <li className={`nav-item ${urlActuelle === '/recherche-de-produits' ? 'active' : ''}`}>
                  <Link to="/recherche-de-produits">
                    <i className="fas fa-pen-square" />
                    <p>Rechercher un produits</p>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link to="#">
                    <i className="fas fa-table" />
                    <p>Pack d’adhésion</p>
                  </Link>
                </li>
                <li className={`nav-item ${urlActuelle === '/parametres' ? 'active' : ''}`}>
                  <Link to={`/parametres`}>
                    <i className="fas fa-cog" />
                    <p>Paramètres</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* End Sidebar */}



        <div className="main-panel">
          <div className="content">
            <div className="panel-header bg-primary-gradient" data-background-color={topBarColor}>
              <div className="page-inner py-5">

              </div>
            </div>
            <div className="page-inner mt--5">
              {children}

              <Footer />
            </div>
          </div>

        </div>

      </div>


      <style jsx>{`

body-text-color: #575962
white-color: #ffffff
black-color: #191919
transparent-bg : transparent
default-color : #282a3c
primary-color : #177dff
secondary-color : #716aca
info-color : #36a3f7
success-color : #35cd3a
warning-color : #ffa534
danger-color : #f3545d

-------------------------------------------------------------------*/
:focus {
  outline: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important
}

.alert,
.brand,
.btn-simple,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
.navbar,
.td-name,
a,
body,
button.close,
h1,
h2,
h3,
h4,
h5,
h6,
p,
td {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Lato, sans-serif
}

body {
  font-size: 14px;
  color: #575962
}

a {
  color: #1572e8
}

a:focus,
a:hover {
  color: #1269db
}

.h1,
h1 {
  font-size: 1.725rem
}

.h2,
h2 {
  font-size: 1.35rem
}

.h3,
h3 {
  font-size: 1.1625rem
}

.h4,
h4 {
  font-size: 1.0375rem
}

.h5,
h5 {
  font-size: .9125rem
}

.h6,
h6 {
  font-size: .825rem
}

p {
  font-size: 14px;
  line-height: 1.82;
  margin-bottom: 1rem;
  word-break: break-word
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.4
}

.h1 a,
.h2 a,
.h3 a,
.h4 a,
.h5 a,
.h6 a,
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
  color: inherit
}

.small,
small {
  font-size: 13px
}

.b,
.strong,
b,
strong {
  font-weight: 600
}

.page-pretitle {
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #95aac9
}

.page-title {
  font-size: 23px;
  font-weight: 600;
  color: #444;
  line-height: 30px;
  margin-bottom: 20px
}

.page-category {
  color: #444;
  line-height: 1.8;
  margin-bottom: 25px
}

.text-primary,
.text-primary a {
  color: #1572e8 !important
}

.text-primary a:hover,
.text-primary:hover {
  color: #1572e8 !important
}

.text-secondary,
.text-secondary a {
  color: #6861ce !important
}

.text-secondary a:hover,
.text-secondary:hover {
  color: #6861ce !important
}

.text-info,
.text-info a {
  color: #48abf7 !important
}

.text-info a:hover,
.text-info:hover {
  color: #48abf7 !important
}

.text-success,
.text-success a {
  color: #31ce36 !important
}

.text-success a:hover,
.text-success:hover {
  color: #31ce36 !important
}

.text-warning,
.text-warning a {
  color: #ffad46 !important
}

.text-warning a:hover,
.text-warning:hover {
  color: #ffad46 !important
}

.text-danger,
.text-danger a {
  color: #f25961 !important
}

.text-danger a:hover,
.text-danger:hover {
  color: #f25961 !important
}

label {
  color: #495057 !important;
  font-size: 14px !important
}

.text-small {
  font-size: 11px
}

.metric-value {
  margin-bottom: 5px;
  line-height: 1;
  white-space: nowrap
}

.metric-label {
  font-size: .975rem;
  font-weight: 500;
  color: #686f76;
  white-space: nowrap;
  margin-bottom: 0
}

.fw-light {
  font-weight: 300 !important
}

.fw-normal {
  font-weight: 400 !important
}

.fw-mediumbold {
  font-weight: 400 !important
}

.fw-bold {
  font-weight: 600 !important
}

.fw-extrabold {
  font-weight: 700 !important
}

.op-9 {
  opacity: .9
}

.op-8 {
  opacity: .8
}

.op-7 {
  opacity: .7
}

.op-6 {
  opacity: .6
}

.op-5 {
  opacity: .5
}

.op-4 {
  opacity: .4
}

.op-3 {
  opacity: .3
}

body {
  min-height: 100vh;
  position: relative;
  background: #f9fbfd
}

.no-bd {
  border: 0 !important
}

.no-box-shadow {
  box-shadow: none !important
}

.mt--5,
.my--5 {
  margin-top: -3rem !important
}

.mt--4,
.my--4 {
  margin-top: -1.5rem !important
}

.mt--3,
.my--3 {
  margin-top: -1rem !important
}

.mt--2,
.my--2 {
  margin-top: -.5rem !important
}

.mt--1,
.my--1 {
  margin-top: -.25rem !important
}

.pull-right {
  float: right
}

.pull-left {
  float: left
}

.wrapper {
  min-height: 100vh;
  position: relative;
  top: 0;
  height: 100vh
}

.main-header {
  background: #fff;
  min-height: 60px;
  width: 100%;
  position: fixed;
  z-index: 1001;
  box-shadow: 0 0 5px rgba(18, 23, 39, .5)
}

.main-header .navbar-header {
  min-height: 62px
}

.main-header .navbar-header .btn-toggle {
  margin-right: 30px;
  margin-left: 20px
}

.logo-header {
  float: left;
  width: 250px;
  height: 62px;
  line-height: 60px;
  color: #333;
  z-index: 1001;
  font-size: 17px;
  font-weight: 400;
  padding-left: 25px;
  padding-right: 25px;
  z-index: 1001;
  display: flex;
  align-items: center;
  position: relative;
  transition: all .3s
}

.logo-header .big-logo {
  margin-right: 8px
}

.logo-header .big-logo:hover {
  text-decoration: none
}

.logo-header .big-logo .logo-img {
  width: 35px;
  height: 35px
}

.logo-header .logo {
  color: #575962;
  opacity: 1;
  position: relative;
  height: 100%
}

.logo-header .logo:hover {
  text-decoration: none
}

.logo-header .logo .navbar-brand {
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 0
}

.logo-header .nav-toggle {
  position: absolute;
  top: 0;
  right: 18px;
  z-index: 5
}

.logo-header .navbar-toggler {
  padding-left: 0;
  padding-right: 0;
  opacity: 0;
  display: none
}

.logo-header .navbar-toggler .navbar-toggler-icon {
  height: 1em;
  width: 1em;
  color: #545454;
  font-size: 22px
}

.logo-header .more {
  background: 0 0;
  border: 0;
  font-size: 22px;
  padding: 0;
  opacity: 0;
  width: 0;
  display: none
}

.btn-toggle {
  font-size: 20px !important;
  line-height: 20px;
  padding: 0 !important;
  background: 0 0 !important;
  color: #575962 !important
}

.btn-toggle:focus,
.btn-toggle:hover {
  opacity: 1
}

#search-nav {
  flex: 1;
  max-width: 400px
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar .nav>.nav-item.active:hover>a:before,
.sidebar .nav>.nav-item.active>a:before,
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav>.nav-item.active:hover>a:before,
.sidebar[data-background-color=white] .nav>.nav-item.active>a:before {
  opacity: 1 !important;
  position: absolute;
  z-index: 1;
  width: 3px;
  height: 100%;
  content: '';
  left: 0;
  top: 0
}

.sidebar,
.sidebar[data-background-color=white] {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  margin-top: 62px;
  display: block;
  z-index: 1000;
  color: #fff;
  font-weight: 200;
  background: #fff;
  -webkit-box-shadow: 4px 4px 10px rgba(69, 65, 78, .06);
  -moz-box-shadow: 4px 4px 10px rgba(69, 65, 78, .06);
  box-shadow: 4px 4px 10px rgba(69, 65, 78, .06);
  transition: all .3s
}

.sidebar.full-height,
.sidebar[data-background-color=white].full-height {
  margin-top: 0
}

.sidebar .user,
.sidebar[data-background-color=white] .user {
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 12.5px;
  border-bottom: 1px solid #f1f1f1;
  display: block;
  margin-left: 10px;
  margin-right: 10px
}

.sidebar .user .info a,
.sidebar[data-background-color=white] .user .info a {
  white-space: nowrap;
  display: block;
  position: relative
}

.sidebar .user .info a:focus,
.sidebar .user .info a:hover,
.sidebar[data-background-color=white] .user .info a:focus,
.sidebar[data-background-color=white] .user .info a:hover {
  text-decoration: none
}

.sidebar .user .info a>span,
.sidebar[data-background-color=white] .user .info a>span {
  font-size: 14px;
  font-weight: 400;
  color: #777;
  display: flex;
  flex-direction: column
}

.sidebar .user .info a>span .user-level,
.sidebar[data-background-color=white] .user .info a>span .user-level {
  color: #555;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px
}

.sidebar .user .info a .link-collapse,
.sidebar[data-background-color=white] .user .info a .link-collapse {
  padding: 7px 0
}

.sidebar .user .info .caret,
.sidebar[data-background-color=white] .user .info .caret {
  position: absolute;
  top: 17px;
  right: 0;
  border-top-color: #777
}

.sidebar .sidebar-wrapper,
.sidebar[data-background-color=white] .sidebar-wrapper {
  position: relative;
  max-height: calc(100vh - 75px);
  min-height: 100%;
  overflow: auto;
  width: 100%;
  z-index: 4;
  padding-bottom: 100px;
  transition: all .3s
}

.sidebar .sidebar-wrapper .sidebar-content,
.sidebar[data-background-color=white] .sidebar-wrapper .sidebar-content {
  padding-top: 0;
  padding-bottom: 55px
}

.sidebar .sidebar-wrapper .scroll-element.scroll-y,
.sidebar[data-background-color=white] .sidebar-wrapper .scroll-element.scroll-y {
  top: 5px !important
}

.sidebar .nav,
.sidebar[data-background-color=white] .nav {
  display: block;
  float: none;
  margin-top: 20px
}

.sidebar .nav .nav-section,
.sidebar[data-background-color=white] .nav .nav-section {
  margin: 15px 0 0 0
}

.sidebar .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=white] .nav .nav-section .sidebar-mini-icon {
  text-align: center;
  font-size: 15px;
  color: #909093;
  display: none
}

.sidebar .nav .nav-section .text-section,
.sidebar[data-background-color=white] .nav .nav-section .text-section {
  padding: 2px 30px;
  font-size: 12px;
  color: #727275;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 12px;
  margin-top: 20px
}

.sidebar .nav>.nav-item,
.sidebar[data-background-color=white] .nav>.nav-item {
  display: list-item
}

.sidebar .nav>.nav-item.active>a,
.sidebar[data-background-color=white] .nav>.nav-item.active>a {
  color: #575962 !important
}

.sidebar .nav>.nav-item.active>a:before,
.sidebar[data-background-color=white] .nav>.nav-item.active>a:before {
  background: #1d7af3
}

.sidebar .nav>.nav-item.active>a p,
.sidebar[data-background-color=white] .nav>.nav-item.active>a p {
  color: #575962 !important;
  font-weight: 600
}

.sidebar .nav>.nav-item.active:hover>a:before,
.sidebar[data-background-color=white] .nav>.nav-item.active:hover>a:before {
  background: #1d7af3
}

.sidebar .nav>.nav-item.active a i,
.sidebar[data-background-color=white] .nav>.nav-item.active a i {
  color: #4d7cfe
}

.sidebar .nav>.nav-item.submenu,
.sidebar[data-background-color=white] .nav>.nav-item.submenu {
  background: rgba(0, 0, 0, .03)
}

.sidebar .nav>.nav-item.submenu>li>a i,
.sidebar[data-background-color=white] .nav>.nav-item.submenu>li>a i {
  color: rgba(23, 125, 255, .76)
}

.sidebar .nav>.nav-item a:focus,
.sidebar .nav>.nav-item>a:hover,
.sidebar[data-background-color=white] .nav>.nav-item a:focus,
.sidebar[data-background-color=white] .nav>.nav-item>a:hover {
  background: rgba(0, 0, 0, .03)
}

.sidebar .nav>.nav-item a,
.sidebar[data-background-color=white] .nav>.nav-item a {
  display: flex;
  align-items: center;
  color: #575962;
  padding: 6px 25px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  margin-bottom: 3px
}

.sidebar .nav>.nav-item a:focus,
.sidebar .nav>.nav-item a:hover,
.sidebar[data-background-color=white] .nav>.nav-item a:focus,
.sidebar[data-background-color=white] .nav>.nav-item a:hover {
  text-decoration: none
}

.sidebar .nav>.nav-item a:focus p,
.sidebar .nav>.nav-item a:hover p,
.sidebar[data-background-color=white] .nav>.nav-item a:focus p,
.sidebar[data-background-color=white] .nav>.nav-item a:hover p {
  color: #575962 !important;
  font-weight: 600
}

.sidebar .nav>.nav-item a:focus i,
.sidebar .nav>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav>.nav-item a:hover i {
  color: #4d7cfe !important
}

.sidebar .nav>.nav-item a .letter-icon,
.sidebar[data-background-color=white] .nav>.nav-item a .letter-icon {
  color: #a1a2a6;
  margin-right: 15px;
  width: 25px;
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 20px;
  font-weight: 200
}

.sidebar .nav>.nav-item a i,
.sidebar[data-background-color=white] .nav>.nav-item a i {
  color: #8d9498;
  margin-right: 15px;
  width: 25px;
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 18px;
  line-height: 30px
}

.sidebar .nav>.nav-item a i[class^=flaticon-],
.sidebar[data-background-color=white] .nav>.nav-item a i[class^=flaticon-] {
  font-size: 20px
}

.sidebar .nav>.nav-item a p,
.sidebar[data-background-color=white] .nav>.nav-item a p {
  font-size: 14px;
  margin-bottom: 0;
  margin-right: 5px;
  white-space: nowrap;
  color: #8d9498
}

.sidebar .nav>.nav-item a .caret,
.sidebar[data-background-color=white] .nav>.nav-item a .caret {
  margin-left: auto;
  margin-right: 10px;
  transition: all .5s;
  color: #8d9498
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true],
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] {
  background: 0 0
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] p,
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #575962
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #4d7cfe
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] .caret {
  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg)
}

.sidebar .nav>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #1d7af3
}

.sidebar .nav.nav-primary>.nav-item a:focus i,
.sidebar .nav.nav-primary>.nav-item a:hover i,
.sidebar .nav.nav-primary>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #1572e8 !important
}

.sidebar .nav.nav-primary>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #1572e8 !important
}

.sidebar .nav.nav-primary>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item.active a:before {
  background: #1572e8 !important
}

.sidebar .nav.nav-primary>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-primary>.nav-item.active a i {
  color: #1572e8 !important
}

.sidebar .nav.nav-secondary>.nav-item a:focus i,
.sidebar .nav.nav-secondary>.nav-item a:hover i,
.sidebar .nav.nav-secondary>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #6861ce !important
}

.sidebar .nav.nav-secondary>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #6861ce !important
}

.sidebar .nav.nav-secondary>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item.active a:before {
  background: #6861ce !important
}

.sidebar .nav.nav-secondary>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-secondary>.nav-item.active a i {
  color: #6861ce !important
}

.sidebar .nav.nav-info>.nav-item a:focus i,
.sidebar .nav.nav-info>.nav-item a:hover i,
.sidebar .nav.nav-info>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #48abf7 !important
}

.sidebar .nav.nav-info>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #48abf7 !important
}

.sidebar .nav.nav-info>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item.active a:before {
  background: #48abf7 !important
}

.sidebar .nav.nav-info>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-info>.nav-item.active a i {
  color: #48abf7 !important
}

.sidebar .nav.nav-success>.nav-item a:focus i,
.sidebar .nav.nav-success>.nav-item a:hover i,
.sidebar .nav.nav-success>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #31ce36 !important
}

.sidebar .nav.nav-success>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #31ce36 !important
}

.sidebar .nav.nav-success>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item.active a:before {
  background: #31ce36 !important
}

.sidebar .nav.nav-success>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-success>.nav-item.active a i {
  color: #31ce36 !important
}

.sidebar .nav.nav-warning>.nav-item a:focus i,
.sidebar .nav.nav-warning>.nav-item a:hover i,
.sidebar .nav.nav-warning>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #ffad46 !important
}

.sidebar .nav.nav-warning>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #ffad46 !important
}

.sidebar .nav.nav-warning>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item.active a:before {
  background: #ffad46 !important
}

.sidebar .nav.nav-warning>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-warning>.nav-item.active a i {
  color: #ffad46 !important
}

.sidebar .nav.nav-danger>.nav-item a:focus i,
.sidebar .nav.nav-danger>.nav-item a:hover i,
.sidebar .nav.nav-danger>.nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item a:focus i,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item a:hover i,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item a[data-toggle=collapse][aria-expanded=true] i {
  color: #f25961 !important
}

.sidebar .nav.nav-danger>.nav-item a[data-toggle=collapse][aria-expanded=true]:before,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: #f25961 !important
}

.sidebar .nav.nav-danger>.nav-item.active a:before,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item.active a:before {
  background: #f25961 !important
}

.sidebar .nav.nav-danger>.nav-item.active a i,
.sidebar[data-background-color=white] .nav.nav-danger>.nav-item.active a i {
  color: #f25961 !important
}

.sidebar .nav-collapse,
.sidebar[data-background-color=white] .nav-collapse {
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 15px;
  padding-top: 10px
}

.sidebar .nav-collapse li.active>a,
.sidebar[data-background-color=white] .nav-collapse li.active>a {
  font-weight: 600
}

.sidebar .nav-collapse li a:before,
.sidebar .nav-collapse li a:hover:before,
.sidebar[data-background-color=white] .nav-collapse li a:before,
.sidebar[data-background-color=white] .nav-collapse li a:hover:before {
  opacity: 0 !important
}

.sidebar .nav-collapse li a,
.sidebar[data-background-color=white] .nav-collapse li a {
  margin-bottom: 3px !important;
  padding: 10px 25px !important
}

.sidebar .nav-collapse li a .sub-item,
.sidebar[data-background-color=white] .nav-collapse li a .sub-item {
  font-size: 14px;
  position: relative;
  margin-left: 25px;
  opacity: .85
}

.sidebar .nav-collapse li a .sub-item:before,
.sidebar[data-background-color=white] .nav-collapse li a .sub-item:before {
  content: '';
  height: 4px;
  width: 4px;
  background: rgba(131, 132, 138, .89);
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100%
}

.sidebar .nav-collapse li a:hover .sub-item,
.sidebar[data-background-color=white] .nav-collapse li a:hover .sub-item {
  opacity: 1
}

.sidebar .nav-collapse li a .sidebar-mini-icon,
.sidebar[data-background-color=white] .nav-collapse li a .sidebar-mini-icon {
  font-size: 18px;
  color: #c3c5ca;
  margin-right: 15px;
  width: 25px;
  text-align: center;
  vertical-align: middle;
  float: left;
  font-weight: 300 !important
}

.sidebar .nav-collapse.subnav,
.sidebar[data-background-color=white] .nav-collapse.subnav {
  padding-bottom: 10px;
  margin-bottom: 0
}

.sidebar .nav-collapse.subnav li a,
.sidebar[data-background-color=white] .nav-collapse.subnav li a {
  padding-left: 40px !important
}

.sidebar.sidebar-style-2 .nav .nav-item {
  padding: 0 15px
}

.sidebar.sidebar-style-2 .nav .nav-item a {
  padding: 8px 10px;
  border-radius: 5px
}

.sidebar.sidebar-style-2 .nav .nav-item a:focus,
.sidebar.sidebar-style-2 .nav .nav-item a:hover,
.sidebar.sidebar-style-2 .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  background: rgba(199, 199, 199, .2)
}

.sidebar.sidebar-style-2 .nav .nav-item a:focus i,
.sidebar.sidebar-style-2 .nav .nav-item a:focus p,
.sidebar.sidebar-style-2 .nav .nav-item a:hover i,
.sidebar.sidebar-style-2 .nav .nav-item a:hover p,
.sidebar.sidebar-style-2 .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar.sidebar-style-2 .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #575962 !important
}

.sidebar.sidebar-style-2 .nav .nav-item.active a:before {
  background: 0 0
}

.sidebar.sidebar-style-2 .nav .nav-item .active a {
  background: rgba(199, 199, 199, .2)
}

.sidebar.sidebar-style-2 .nav .nav-item .active a i,
.sidebar.sidebar-style-2 .nav .nav-item .active a p {
  color: #575962 !important
}

.sidebar.sidebar-style-2 .nav .nav-item.submenu {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav .nav-item a[data-toggle=collapse][aria-expanded=true]:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a {
  background: #1572e8 !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(21, 114, 232, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-primary>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a {
  background: #6861ce !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(104, 97, 206, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-secondary>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a {
  background: #48abf7 !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(72, 171, 247, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-info>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a {
  background: #31ce36 !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(49, 206, 54, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-success>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a {
  background: #ffad46 !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(255, 173, 70, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-warning>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a {
  background: #f25961 !important;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, .1), 4px 4px 15px -5px rgba(242, 89, 97, .4) !important
}

.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a:before {
  background: 0 0 !important
}

.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a .caret,
.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a i,
.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a p,
.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a span {
  color: #fff !important
}

.sidebar.sidebar-style-2 .nav.nav-danger>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i {
  color: #fff !important
}

.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a:focus i,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a:focus p,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a:hover i,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a:hover p,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a:focus i,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a:focus p,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a:hover i,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a:hover p,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #b9babf !important
}

.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a {
  color: #fff
}

.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a .caret,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a i,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a p,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a span,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a .caret,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a i,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a p,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a span {
  color: #fff
}

.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] i,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] p,
.sidebar.sidebar-style-2[data-background-color=dark2] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] span,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] i,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] p,
.sidebar.sidebar-style-2[data-background-color=dark] .nav .nav-item.active a[data-toggle=collapse][aria-expanded=true] span {
  color: #fff
}

.main-panel {
  position: relative;
  width: calc(100% - 250px);
  height: 100vh;
  min-height: 100%;
  float: right;
  transition: all .3s
}

.main-panel>.content {
  padding: 0 !important;
  min-height: calc(100% - 123px);
  margin-top: 62px;
  overflow: hidden
}

.main-panel>.content-full {
  padding: 0 !important;
  min-height: calc(100% - 123px);
  margin-top: 63px;
  overflow: hidden
}

.main-panel .page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px
}

.main-panel .page-header .page-title {
  margin-bottom: 0
}

.main-panel .page-header .btn-page-header-dropdown {
  width: 35px;
  height: 35px;
  font-size: 14px;
  padding: 0;
  color: #6b6b6b;
  box-shadow: 0 2px 14px 0 rgba(144, 116, 212, .1) !important;
  border: 0
}

.main-panel .page-header .btn-page-header-dropdown:after {
  display: none
}

.main-panel .page-header .dropdown-menu {
  margin-top: 15px;
  top: 0 !important
}

.main-panel .page-header .dropdown-menu:after {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
  position: absolute;
  top: -8px;
  right: 32px;
  content: ''
}

.main-panel .page-divider {
  height: 0;
  margin: .3rem 0 1rem;
  overflow: hidden;
  border-top: 1px solid #ebecec
}

.page-wrapper {
  min-height: calc(100vh - 57px);
  position: relative
}

.page-wrapper.has-sidebar .page-inner {
  margin-right: 22.5rem
}

.page-navs {
  position: relative;
  display: block;
  padding-right: 1rem;
  padding-left: 1rem;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .07);
  z-index: 1
}

.page-navs .nav .nav-link {
  padding: 1rem !important
}

.page-navs .nav-line {
  border: 0 !important
}

.page-navs .nav-line .nav-link {
  border-bottom-width: 3px !important
}

.nav-scroller .nav {
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap
}

@media (min-width:992px) {
  .page-navs {
    padding-right: 2rem;
    padding-left: 2rem
  }
}

.page-inner {
  padding: 1.5rem 0
}

@media (min-width:576px) {
  .page-inner {
    padding-right: 1rem;
    padding-left: 1rem
  }
}

@media (min-width:992px) {
  .page-inner {
    padding-right: 2rem;
    padding-left: 2rem
  }
}

.page-inner-fill {
  padding: 0;
  height: calc(100% - 57px);
  display: flex;
  flex-direction: column
}

.page-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 22.5rem;
  box-shadow: none;
  transform: translate3d(100%, 0, 0);
  overflow: auto;
  z-index: 999;
  transition: transform .2s ease-in-out;
  border-left: 1px solid rgba(61, 70, 79, .125) !important
}

.page-sidebar .back {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(61, 70, 79, .05), 0 1px 3px 0 rgba(61, 70, 79, .15);
  font-size: 15px
}

.page-sidebar-section {
  flex: 1;
  overflow-y: auto
}

@media (min-width:1200px) {
  .page-sidebar {
    transform: translateZ(0)
  }
}

@media (max-width:1200px) {
  .page-wrapper.has-sidebar .page-inner {
    margin-right: 0
  }

  .pagesidebar_open .page-sidebar {
    transform: translate3d(0, 0, 0) !important;
    max-width: unset
  }
}

.page-with-aside {
  display: flex
}

.page-with-aside .page-aside {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid #f1f1f1;
  padding: 15px 0
}

.page-with-aside .page-aside .aside-header {
  padding: 15px 22px
}

.page-with-aside .page-aside .aside-header .title {
  font-size: 24px
}

.page-with-aside .page-aside .aside-header .description {
  font-size: 12px
}

.page-with-aside .page-aside .aside-nav .nav {
  flex-direction: column
}

.page-with-aside .page-aside .aside-nav .nav>li {
  padding: 8px 22px;
  margin-bottom: 5px
}

.page-with-aside .page-aside .aside-nav .nav>li.active,
.page-with-aside .page-aside .aside-nav .nav>li:focus,
.page-with-aside .page-aside .aside-nav .nav>li:hover {
  background: rgba(51, 51, 51, .08)
}

.page-with-aside .page-aside .aside-nav .nav>li.active {
  padding: 12px 22px;
  font-weight: 600
}

.page-with-aside .page-aside .aside-nav .nav>li.active>a {
  color: #575962 !important
}

.page-with-aside .page-aside .aside-nav .nav>li>a {
  color: #83848a;
  display: flex;
  align-items: center;
  font-size: 12px
}

.page-with-aside .page-aside .aside-nav .nav>li>a:focus,
.page-with-aside .page-aside .aside-nav .nav>li>a:hover {
  text-decoration: none
}

.page-with-aside .page-aside .aside-nav .nav>li>a i {
  font-size: 20px;
  margin-right: 15px;
  color: #a1a2a6
}

.page-with-aside .page-aside .aside-nav .label {
  padding: 5px 22px;
  margin-top: 22px;
  margin-bottom: 5px;
  display: block
}

.page-with-aside .page-aside .aside-compose {
  padding: 25px 22px
}

.page-with-aside .page-content {
  width: calc(100% - 280px)
}

.footer {
  border-top: 1px solid #eee;
  padding: 15px;
  background: #fff;
  position: absolute;
  width: 100%
}

.footer .container,
.footer .container-fluid {
  display: flex;
  align-items: center
}

@media screen and (min-width:991px) {
  .sidebar_minimize .main-panel {
    width: calc(100% - 75px);
    transition: all .3s
  }

  .sidebar_minimize .logo-header {
    width: 75px;
    transition: all .3s;
    padding: 0;
    text-align: center
  }

  .sidebar_minimize .logo-header .big-logo {
    margin-right: 0
  }

  .sidebar_minimize .logo-header .logo {
    position: absolute;
    transform: translate3d(25px, 0, 0);
    opacity: 0
  }

  .sidebar_minimize .logo-header .logo img {
    display: none
  }

  .sidebar_minimize .logo-header .nav-toggle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    right: 0 !important
  }

  .sidebar_minimize .sidebar {
    width: 75px;
    transition: all .3s
  }

  .sidebar_minimize .sidebar .sidebar-wrapper {
    width: 75px;
    transition: all .3s
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .user {
    padding-left: 0;
    padding-right: 0
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .user [class^=avatar-] {
    float: none !important;
    margin: auto
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .user .info {
    display: none
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .user .info span {
    display: none
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item {
    position: relative
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a .letter-icon {
    display: block !important
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a i {
    margin-right: unset
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a .badge,
  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a .caret,
  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a p,
  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a span {
    display: none;
    transition: all .3s
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item a .sidebar-mini-icon {
    display: block !important;
    margin-right: 0
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item.active .nav-collapse,
  .sidebar_minimize .sidebar .sidebar-wrapper .nav-item.submenu .nav-collapse {
    display: none
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-section .text-section {
    display: none
  }

  .sidebar_minimize .sidebar .sidebar-wrapper .nav-section .sidebar-mini-icon {
    display: block
  }

  .sidebar_minimize .sidebar:hover {
    width: 250px
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper {
    width: 250px
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .user {
    padding-left: 15px;
    padding-right: 15px
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .user [class^=avatar-] {
    float: left !important;
    margin-right: 11px !important
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .user .info {
    display: block
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .user .info span {
    display: block
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a i {
    margin-right: 15px
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a .badge,
  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a .caret,
  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a p,
  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a span {
    display: block
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item a .sidebar-mini-icon {
    display: block !important;
    margin-right: 15px
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item.active .nav-collapse,
  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-item.submenu .nav-collapse {
    display: block
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-section .sidebar-mini-icon {
    display: none
  }

  .sidebar_minimize .sidebar:hover .sidebar-wrapper .nav-section .text-section {
    display: block
  }

  .sidebar_minimize.sidebar_minimize_hover .logo-header {
    width: 250px;
    padding-left: 25px;
    padding-right: 25px;
    text-align: left
  }

  .sidebar_minimize.sidebar_minimize_hover .logo-header .logo {
    opacity: 1 !important;
    transform: translate3d(0, 0, 0) !important;
    position: relative !important
  }

  .sidebar_minimize.sidebar_minimize_hover .logo-header .logo img {
    display: inline-block !important
  }

  .sidebar_minimize.sidebar_minimize_hover .main-panel {
    width: calc(100% - 250px)
  }

  .sidebar_minimize_hover .logo-header .nav-toggle {
    right: 18px !important;
    transform: translateX(0) !important;
    left: unset
  }
}

.overlay-sidebar:not(.is-show) .sidebar {
  left: -250px
}

.overlay-sidebar .main-panel {
  width: 100% !important
}

@media screen and (min-width:991px) {
  .compact-wrapper .main-header .logo-header {
    width: 175px
  }

  .compact-wrapper .sidebar {
    width: 175px
  }

  .compact-wrapper .sidebar .badge {
    position: absolute;
    top: 8px;
    right: 8px
  }

  .compact-wrapper .sidebar .text-section {
    text-align: center
  }

  .compact-wrapper .sidebar .nav>.nav-item a {
    flex-direction: column
  }

  .compact-wrapper .sidebar .nav>.nav-item a i {
    margin-right: 0
  }

  .compact-wrapper .sidebar .nav>.nav-item a p {
    margin-right: 0
  }

  .compact-wrapper .sidebar .nav>.nav-item a .caret {
    display: none
  }

  .compact-wrapper .sidebar .nav-collapse li a .sub-item {
    margin-left: 0;
    text-align: center
  }

  .compact-wrapper .sidebar .nav-collapse li a .sub-item:before {
    display: none
  }

  .compact-wrapper .main-panel {
    width: calc(100% - 175px)
  }
}

@media screen and (min-width:991px) {
  .classic-wrapper .classic-grid {
    margin: 93px 40px 30px
  }

  .classic-wrapper .main-header {
    top: 0
  }

  .classic-wrapper .main-header .logo-header {
    padding: 0 40px;
    width: 290px
  }

  .classic-wrapper .sidebar {
    position: relative;
    float: left;
    margin-top: 0
  }

  .classic-wrapper .sidebar .sidebar-wrapper {
    max-height: unset;
    min-height: 100%
  }

  .classic-wrapper .navbar-header {
    padding-right: 30px
  }

  .classic-wrapper .main-panel {
    height: unset
  }

  .classic-wrapper .main-panel .content,
  .classic-wrapper .main-panel .content-full {
    margin-top: 0
  }

  .classic-wrapper .page-inner {
    padding-right: 0;
    padding-top: 5px
  }

  .classic-wrapper .board {
    height: 100%
  }

  .sidebar_minimize .classic-wrapper .logo-header .logo {
    position: relative;
    transform: unset;
    opacity: 1
  }

  .sidebar_minimize .classic-wrapper .logo-header .logo img {
    display: inline-block
  }

  .sidebar_minimize .classic-wrapper .logo-header .nav-toggle {
    left: unset;
    transform: unset;
    right: 18px !important
  }
}

.classic-wrapper {
  height: unset
}

.classic-wrapper .main-panel {
  height: unset
}

.classic-wrapper .footer {
  position: unset
}

.classic-grid {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
}

@media screen and (min-width:991px) {
  .static-sidebar {
    height: unset
  }

  .static-sidebar .sidebar {
    position: static;
    float: left
  }

  .static-sidebar .sidebar .sidebar-wrapper {
    max-height: unset;
    min-height: 100%
  }

  .static-sidebar .main-panel {
    height: unset
  }

  .static-sidebar .main-panel .content {
    margin-bottom: 60px
  }

  .static-sidebar .footer {
    position: absolute;
    bottom: 0
  }
}

.mail-wrapper .toggle-email-nav {
  margin-top: 10px;
  display: none
}

.mail-wrapper .mail-content .email-head,
.mail-wrapper .mail-content .inbox-head {
  padding: 35px 25px 20px
}

.mail-wrapper .mail-content .email-head h3,
.mail-wrapper .mail-content .inbox-head h3 {
  font-size: 22px;
  font-weight: 300;
  margin: 0
}

.mail-wrapper .mail-content .email-head {
  padding: 35px 25px;
  border-bottom: 1px solid #f1f1f1
}

.mail-wrapper .mail-content .email-head .favorite {
  color: #eee;
  margin-right: 5px
}

.mail-wrapper .mail-content .email-head .favorite.active {
  color: #ffc600
}

.mail-wrapper .mail-content .email-head .controls {
  margin-left: auto
}

.mail-wrapper .mail-content .email-head .controls>a {
  color: #9c9c9c;
  font-size: 18px;
  padding: 0 5px
}

.mail-wrapper .mail-content .email-head .controls>a:hover {
  text-decoration: none;
  opacity: .8
}

.mail-wrapper .mail-content .email-head .controls>a:last-child {
  padding-right: 0
}

.mail-wrapper .mail-content .email-sender {
  padding: 14px 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1
}

.mail-wrapper .mail-content .email-sender .avatar {
  padding-right: 12px
}

.mail-wrapper .mail-content .email-sender .avatar img {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%
}

.mail-wrapper .mail-content .email-sender .date {
  margin-left: auto
}

.mail-wrapper .mail-content .email-sender .sender .action {
  display: inline-block
}

.mail-wrapper .mail-content .email-sender .sender .action>a {
  cursor: pointer
}

.mail-wrapper .mail-content .email-body {
  padding: 30px 28px
}

.mail-wrapper .mail-content .email-attachments {
  padding: 25px 28px;
  border-top: 1px solid #f1f1f1
}

.mail-wrapper .mail-content .email-attachments .title {
  font-weight: 400;
  margin-bottom: 10px
}

.mail-wrapper .mail-content .email-attachments .title span {
  font-weight: 400
}

.mail-wrapper .mail-content .email-attachments ul {
  padding-left: 0;
  list-style: none
}

.mail-wrapper .mail-content .email-attachments ul li {
  padding: 6px 0
}

.mail-wrapper .mail-content .email-attachments ul li a {
  font-weight: 400
}

.mail-wrapper .mail-content .email-attachments ul li a:hover {
  text-decoration: none
}

.mail-wrapper .mail-content .email-attachments ul li a i {
  font-size: 20px;
  display: inline-block;
  vertical-align: middle
}

.mail-wrapper .mail-content .email-attachments ul li a span {
  font-weight: 400
}

.mail-wrapper .mail-content .inbox-body {
  padding: 20px 0
}

.mail-wrapper .mail-content .inbox-body .mail-option {
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex
}

.mail-wrapper .mail-content .inbox-body .mail-option .chk-all {
  display: inline-block
}

.mail-wrapper .mail-content .inbox-body .mail-option .btn-option {
  color: #555 !important;
  border: 1px solid #ebedf2 !important;
  font-weight: 600;
  background: #fff !important;
  box-shadow: 2px 2px 3px 0 #f2f1f1 !important
}

.mail-wrapper .mail-content .inbox-body .mail-option .form-check {
  padding: 0
}

.mail-wrapper .mail-content .inbox-body .mail-option .form-check .form-check-sign:before {
  border: 1px solid #eee;
  background: #eee
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item {
  padding: 14px 20px;
  display: table;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  width: 100%;
  border-top: 1px solid #f1f1f1
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item:hover {
  background: #f6f5f5
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions,
.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail {
  vertical-align: top;
  display: table-cell
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions {
  width: 50px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions .custom-checkbox {
  margin-right: 0
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions .favorite {
  color: #eee;
  font-size: 18px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions .favorite:hover {
  text-decoration: none;
  color: #969696
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions .favorite.active,
.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-actions .favorite.active:hover {
  color: #ffc600
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail .msg,
.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail p {
  font-size: 12px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail .msg {
  margin-bottom: 0;
  margin-top: 8px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail .from {
  font-size: 13px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail .date {
  font-size: 12px;
  display: flex;
  align-items: center
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item .email-list-detail .date .paperclip {
  font-size: 16px;
  padding-right: 4px
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item.unread {
  font-weight: 400;
  background: #fbfbfb
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item.unread:after {
  content: '';
  display: block;
  position: absolute;
  width: 3px;
  background: #1572e8;
  top: -1px;
  left: 0;
  bottom: -1px;
  height: calc(100% + 2px)
}

.mail-wrapper .mail-content .inbox-body .email-list .email-list-item.unread .email-list-detail .from {
  font-weight: 600
}

.mail-wrapper .mail-content .email-compose-fields,
.mail-wrapper .mail-content .email-editor {
  padding: 20px 25px
}

.mail-wrapper .mail-content .email-compose-fields {
  padding: 20px 25px;
  border-bottom: 1px solid #f1f1f1
}

.mail-wrapper .mail-content .email-action {
  text-align: right;
  margin-bottom: 15px
}

.mail-wrapper .mail-content .email-action>.btn {
  margin-right: 7px
}

.mail-wrapper .mail-content .email-action>.btn:last-child {
  margin-right: 0
}

.flex-1 {
  -ms-flex: 1;
  flex: 1
}

.metric {
  display: flex;
  padding: 1rem;
  flex-direction: column
}


.sidebar[data-background-color=dark] .nav>.nav-item a:focus p,
.sidebar[data-background-color=dark] .nav>.nav-item a:hover p,
.sidebar[data-background-color=dark] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #b9babf !important
}

.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:focus,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:hover,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #1a2035 !important
}

.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a .caret,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a i,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a p,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:focus .caret,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:focus i,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:focus p,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:hover .caret,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:hover i,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a:hover p,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=dark].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #1a2035 !important
}

.sidebar[data-background-color=dark] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=dark] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=dark] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=dark2] {
  background: #1f283e !important
}

.sidebar[data-background-color=dark2] .user {
  border-color: rgba(181, 181, 181, .1) !important
}

.sidebar[data-background-color=dark2] .user .info a>span {
  color: #b9babf
}

.sidebar[data-background-color=dark2] .user .info a>span .user-level {
  color: #8d9498
}

.sidebar[data-background-color=dark2] .nav>.nav-item.active>a p {
  color: #b9babf !important
}

.sidebar[data-background-color=dark2] .nav>.nav-item a {
  color: #b9babf !important
}

.sidebar[data-background-color=dark2] .nav>.nav-item a:focus p,
.sidebar[data-background-color=dark2] .nav>.nav-item a:hover p,
.sidebar[data-background-color=dark2] .nav>.nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #b9babf !important
}

.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:focus,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:hover,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #1f283e !important
}

.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a .caret,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a i,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a p,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:focus .caret,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:focus i,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:focus p,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:hover .caret,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:hover i,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a:hover p,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=dark2].sidebar-style-2 .nav .nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #1f283e !important
}

.sidebar[data-background-color=dark2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=dark2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=dark2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=blue] {
  background: #1572e8 !important
}

.sidebar[data-background-color=blue] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=blue] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=blue] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=blue] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=blue] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=blue] .nav .nav-item a .caret,
.sidebar[data-background-color=blue] .nav .nav-item a i,
.sidebar[data-background-color=blue] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=blue] .nav .nav-item a:focus,
.sidebar[data-background-color=blue] .nav .nav-item a:hover,
.sidebar[data-background-color=blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=blue] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=blue] .nav .nav-item a:focus i,
.sidebar[data-background-color=blue] .nav .nav-item a:focus p,
.sidebar[data-background-color=blue] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=blue] .nav .nav-item a:hover i,
.sidebar[data-background-color=blue] .nav .nav-item a:hover p,
.sidebar[data-background-color=blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=blue] .nav>.nav-item.active>a,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #1572e8 !important
}

.sidebar[data-background-color=blue] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a i,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a p,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #1572e8 !important
}

.sidebar[data-background-color=blue] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=blue] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=blue] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=blue] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=blue] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=blue] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=blue2] {
  background: #1269db !important
}

.sidebar[data-background-color=blue2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=blue2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=blue2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=blue2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=blue2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=blue2] .nav .nav-item a .caret,
.sidebar[data-background-color=blue2] .nav .nav-item a i,
.sidebar[data-background-color=blue2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=blue2] .nav .nav-item a:focus,
.sidebar[data-background-color=blue2] .nav .nav-item a:hover,
.sidebar[data-background-color=blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=blue2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=blue2] .nav .nav-item a:focus i,
.sidebar[data-background-color=blue2] .nav .nav-item a:focus p,
.sidebar[data-background-color=blue2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=blue2] .nav .nav-item a:hover i,
.sidebar[data-background-color=blue2] .nav .nav-item a:hover p,
.sidebar[data-background-color=blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=blue2] .nav>.nav-item.active>a,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #1269db !important
}

.sidebar[data-background-color=blue2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #1269db !important
}

.sidebar[data-background-color=blue2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=blue2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=blue2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=blue2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=blue2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=blue2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=purple] {
  background: #6861ce !important
}

.sidebar[data-background-color=purple] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=purple] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=purple] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=purple] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=purple] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=purple] .nav .nav-item a .caret,
.sidebar[data-background-color=purple] .nav .nav-item a i,
.sidebar[data-background-color=purple] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=purple] .nav .nav-item a:focus,
.sidebar[data-background-color=purple] .nav .nav-item a:hover,
.sidebar[data-background-color=purple] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=purple] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=purple] .nav .nav-item a:focus i,
.sidebar[data-background-color=purple] .nav .nav-item a:focus p,
.sidebar[data-background-color=purple] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=purple] .nav .nav-item a:hover i,
.sidebar[data-background-color=purple] .nav .nav-item a:hover p,
.sidebar[data-background-color=purple] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=purple] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=purple] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=purple] .nav>.nav-item.active>a,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #6861ce !important
}

.sidebar[data-background-color=purple] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a i,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a p,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=purple] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #6861ce !important
}

.sidebar[data-background-color=purple] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=purple] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=purple] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=purple] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=purple] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=purple] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=purple2] {
  background: #5c55bf !important
}

.sidebar[data-background-color=purple2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=purple2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=purple2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=purple2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=purple2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=purple2] .nav .nav-item a .caret,
.sidebar[data-background-color=purple2] .nav .nav-item a i,
.sidebar[data-background-color=purple2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=purple2] .nav .nav-item a:focus,
.sidebar[data-background-color=purple2] .nav .nav-item a:hover,
.sidebar[data-background-color=purple2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=purple2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=purple2] .nav .nav-item a:focus i,
.sidebar[data-background-color=purple2] .nav .nav-item a:focus p,
.sidebar[data-background-color=purple2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=purple2] .nav .nav-item a:hover i,
.sidebar[data-background-color=purple2] .nav .nav-item a:hover p,
.sidebar[data-background-color=purple2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=purple2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=purple2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=purple2] .nav>.nav-item.active>a,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #5c55bf !important
}

.sidebar[data-background-color=purple2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=purple2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #5c55bf !important
}

.sidebar[data-background-color=purple2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=purple2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=purple2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=purple2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=purple2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=purple2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=light-blue] {
  background: #48abf7 !important
}

.sidebar[data-background-color=light-blue] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=light-blue] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=light-blue] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=light-blue] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=light-blue] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=light-blue] .nav .nav-item a .caret,
.sidebar[data-background-color=light-blue] .nav .nav-item a i,
.sidebar[data-background-color=light-blue] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=light-blue] .nav .nav-item a:focus,
.sidebar[data-background-color=light-blue] .nav .nav-item a:hover,
.sidebar[data-background-color=light-blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=light-blue] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=light-blue] .nav .nav-item a:focus i,
.sidebar[data-background-color=light-blue] .nav .nav-item a:focus p,
.sidebar[data-background-color=light-blue] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=light-blue] .nav .nav-item a:hover i,
.sidebar[data-background-color=light-blue] .nav .nav-item a:hover p,
.sidebar[data-background-color=light-blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=light-blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=light-blue] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #48abf7 !important
}

.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a i,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a p,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=light-blue] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #48abf7 !important
}

.sidebar[data-background-color=light-blue] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=light-blue] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=light-blue] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=light-blue] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=light-blue] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=light-blue] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=light-blue2] {
  background: #3697e1 !important
}

.sidebar[data-background-color=light-blue2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=light-blue2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=light-blue2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=light-blue2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=light-blue2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=light-blue2] .nav .nav-item a .caret,
.sidebar[data-background-color=light-blue2] .nav .nav-item a i,
.sidebar[data-background-color=light-blue2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=light-blue2] .nav .nav-item a:focus,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:hover,
.sidebar[data-background-color=light-blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=light-blue2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:focus i,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:focus p,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:hover i,
.sidebar[data-background-color=light-blue2] .nav .nav-item a:hover p,
.sidebar[data-background-color=light-blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=light-blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=light-blue2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #3697e1 !important
}

.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=light-blue2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #3697e1 !important
}

.sidebar[data-background-color=light-blue2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=light-blue2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=light-blue2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=light-blue2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=light-blue2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=light-blue2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=green] {
  background: #31ce36 !important
}

.sidebar[data-background-color=green] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=green] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=green] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=green] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=green] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=green] .nav .nav-item a .caret,
.sidebar[data-background-color=green] .nav .nav-item a i,
.sidebar[data-background-color=green] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=green] .nav .nav-item a:focus,
.sidebar[data-background-color=green] .nav .nav-item a:hover,
.sidebar[data-background-color=green] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=green] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=green] .nav .nav-item a:focus i,
.sidebar[data-background-color=green] .nav .nav-item a:focus p,
.sidebar[data-background-color=green] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=green] .nav .nav-item a:hover i,
.sidebar[data-background-color=green] .nav .nav-item a:hover p,
.sidebar[data-background-color=green] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=green] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=green] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=green] .nav>.nav-item.active>a,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=green] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #31ce36 !important
}

.sidebar[data-background-color=green] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=green] .nav>.nav-item.active>a i,
.sidebar[data-background-color=green] .nav>.nav-item.active>a p,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=green] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=green] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=green] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=green] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #31ce36 !important
}

.sidebar[data-background-color=green] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=green] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=green] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=green] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=green] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=green] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=green2] {
  background: #2bb930 !important
}

.sidebar[data-background-color=green2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=green2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=green2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=green2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=green2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=green2] .nav .nav-item a .caret,
.sidebar[data-background-color=green2] .nav .nav-item a i,
.sidebar[data-background-color=green2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=green2] .nav .nav-item a:focus,
.sidebar[data-background-color=green2] .nav .nav-item a:hover,
.sidebar[data-background-color=green2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=green2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=green2] .nav .nav-item a:focus i,
.sidebar[data-background-color=green2] .nav .nav-item a:focus p,
.sidebar[data-background-color=green2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=green2] .nav .nav-item a:hover i,
.sidebar[data-background-color=green2] .nav .nav-item a:hover p,
.sidebar[data-background-color=green2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=green2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=green2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=green2] .nav>.nav-item.active>a,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #2bb930 !important
}

.sidebar[data-background-color=green2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=green2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #2bb930 !important
}

.sidebar[data-background-color=green2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=green2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=green2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=green2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=green2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=green2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=orange] {
  background: #ffad46 !important
}

.sidebar[data-background-color=orange] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=orange] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=orange] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=orange] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=orange] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=orange] .nav .nav-item a .caret,
.sidebar[data-background-color=orange] .nav .nav-item a i,
.sidebar[data-background-color=orange] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=orange] .nav .nav-item a:focus,
.sidebar[data-background-color=orange] .nav .nav-item a:hover,
.sidebar[data-background-color=orange] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=orange] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=orange] .nav .nav-item a:focus i,
.sidebar[data-background-color=orange] .nav .nav-item a:focus p,
.sidebar[data-background-color=orange] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=orange] .nav .nav-item a:hover i,
.sidebar[data-background-color=orange] .nav .nav-item a:hover p,
.sidebar[data-background-color=orange] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=orange] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=orange] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=orange] .nav>.nav-item.active>a,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #ffad46 !important
}

.sidebar[data-background-color=orange] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a i,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a p,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=orange] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #ffad46 !important
}

.sidebar[data-background-color=orange] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=orange] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=orange] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=orange] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=orange] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=orange] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=orange2] {
  background: #ff9e27 !important
}

.sidebar[data-background-color=orange2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=orange2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=orange2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=orange2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=orange2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=orange2] .nav .nav-item a .caret,
.sidebar[data-background-color=orange2] .nav .nav-item a i,
.sidebar[data-background-color=orange2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=orange2] .nav .nav-item a:focus,
.sidebar[data-background-color=orange2] .nav .nav-item a:hover,
.sidebar[data-background-color=orange2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=orange2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=orange2] .nav .nav-item a:focus i,
.sidebar[data-background-color=orange2] .nav .nav-item a:focus p,
.sidebar[data-background-color=orange2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=orange2] .nav .nav-item a:hover i,
.sidebar[data-background-color=orange2] .nav .nav-item a:hover p,
.sidebar[data-background-color=orange2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=orange2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=orange2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=orange2] .nav>.nav-item.active>a,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #ff9e27 !important
}

.sidebar[data-background-color=orange2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=orange2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #ff9e27 !important
}

.sidebar[data-background-color=orange2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=orange2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=orange2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=orange2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=orange2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=orange2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=red] {
  background: #f25961 !important
}

.sidebar[data-background-color=red] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=red] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=red] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=red] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=red] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=red] .nav .nav-item a .caret,
.sidebar[data-background-color=red] .nav .nav-item a i,
.sidebar[data-background-color=red] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=red] .nav .nav-item a:focus,
.sidebar[data-background-color=red] .nav .nav-item a:hover,
.sidebar[data-background-color=red] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=red] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=red] .nav .nav-item a:focus i,
.sidebar[data-background-color=red] .nav .nav-item a:focus p,
.sidebar[data-background-color=red] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=red] .nav .nav-item a:hover i,
.sidebar[data-background-color=red] .nav .nav-item a:hover p,
.sidebar[data-background-color=red] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=red] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=red] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=red] .nav>.nav-item.active>a,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=red] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #f25961 !important
}

.sidebar[data-background-color=red] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=red] .nav>.nav-item.active>a i,
.sidebar[data-background-color=red] .nav>.nav-item.active>a p,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=red] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=red] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=red] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=red] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #f25961 !important
}

.sidebar[data-background-color=red] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=red] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=red] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=red] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=red] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=red] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.sidebar[data-background-color=red2] {
  background: #ea4d56 !important
}

.sidebar[data-background-color=red2] .user {
  margin-top: 0;
  padding-top: 12.5px;
  border-top: 1px solid;
  border-color: rgba(255, 255, 255, .1) !important
}

.sidebar[data-background-color=red2] .user .info a>span {
  color: #fff
}

.sidebar[data-background-color=red2] .user .info a>span .user-level {
  color: #eaeaea
}

.sidebar[data-background-color=red2] .user .info .caret {
  border-top-color: #fff
}

.sidebar[data-background-color=red2] .nav .nav-item a {
  color: #eaeaea !important
}

.sidebar[data-background-color=red2] .nav .nav-item a .caret,
.sidebar[data-background-color=red2] .nav .nav-item a i,
.sidebar[data-background-color=red2] .nav .nav-item a p {
  color: #eaeaea !important
}

.sidebar[data-background-color=red2] .nav .nav-item a:focus,
.sidebar[data-background-color=red2] .nav .nav-item a:hover,
.sidebar[data-background-color=red2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] {
  color: #fff !important
}

.sidebar[data-background-color=red2] .nav .nav-item a:focus .caret,
.sidebar[data-background-color=red2] .nav .nav-item a:focus i,
.sidebar[data-background-color=red2] .nav .nav-item a:focus p,
.sidebar[data-background-color=red2] .nav .nav-item a:hover .caret,
.sidebar[data-background-color=red2] .nav .nav-item a:hover i,
.sidebar[data-background-color=red2] .nav .nav-item a:hover p,
.sidebar[data-background-color=red2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=red2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=red2] .nav .nav-item a[data-toggle=collapse][aria-expanded=true] p {
  color: #fff !important
}

.sidebar[data-background-color=red2] .nav>.nav-item.active>a,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:focus,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:hover,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] {
  background: #fff !important;
  color: #ea4d56 !important
}

.sidebar[data-background-color=red2] .nav>.nav-item.active>a .caret,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a i,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a p,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:focus .caret,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:focus i,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:focus p,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:hover .caret,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:hover i,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a:hover p,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] .caret,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] i,
.sidebar[data-background-color=red2] .nav>.nav-item.active>a[data-toggle=collapse][aria-expanded=true] p {
  color: #ea4d56 !important
}

.sidebar[data-background-color=red2] .nav .nav-section .sidebar-mini-icon,
.sidebar[data-background-color=red2] .nav .nav-section .text-section {
  color: #eaeaea
}

.sidebar[data-background-color=red2] .nav .nav-collapse li a .sub-item:before {
  background: #eaeaea
}

.sidebar[data-background-color=red2] .scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #f7f7f7
}

.sidebar[data-background-color=red2] .scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.sidebar[data-background-color=red2] .scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #dcdbdb
}

.avatar {
  position: relative;
  display: inline-block
}

.avatar-img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover
}

.avatar-title {
  width: 100%;
  height: 100%;
  background-color: #6861ce;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center
}

.avatar-away::before,
.avatar-offline::before,
.avatar-online::before {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  content: '';
  border: 2px solid #fff
}

.avatar-online::before {
  background-color: #31ce36
}

.avatar-offline::before {
  background-color: #97a2b1
}

.avatar-away::before {
  background-color: #ffad46
}

.avatar {
  width: 3rem;
  height: 3rem
}

.avatar .border {
  border-width: 3px !important
}

.avatar .rounded {
  border-radius: 6px !important
}

.avatar .avatar-title {
  font-size: 18px
}

.avatar-xs {
  width: 1.65rem;
  height: 1.65rem
}

.avatar-xs .border {
  border-width: 2px !important
}

.avatar-xs .rounded {
  border-radius: 4px !important
}

.avatar-xs .avatar-title {
  font-size: 12px
}

.avatar-xs.avatar-away::before,
.avatar-xs.avatar-offline::before,
.avatar-xs.avatar-online::before {
  border-width: 1px
}

.avatar-sm {
  width: 2.5rem;
  height: 2.5rem
}

.avatar-sm .border {
  border-width: 3px !important
}

.avatar-sm .rounded {
  border-radius: 4px !important
}

.avatar-sm .avatar-title {
  font-size: 15px
}

.avatar-sm.avatar-away::before,
.avatar-sm.avatar-offline::before,
.avatar-sm.avatar-online::before {
  border-width: 2px
}

.avatar-lg {
  width: 3.75rem;
  height: 3.75rem
}

.avatar-lg .border {
  border-width: 3px !important
}

.avatar-lg .rounded {
  border-radius: 8px !important
}

.avatar-lg .avatar-title {
  font-size: 24px
}

.avatar-lg.avatar-away::before,
.avatar-lg.avatar-offline::before,
.avatar-lg.avatar-online::before {
  border-width: 3px
}

.avatar-xl {
  width: 5rem;
  height: 5rem
}

.avatar-xl .border {
  border-width: 4px !important
}

.avatar-xl .rounded {
  border-radius: 8px !important
}

.avatar-xl .avatar-title {
  font-size: 28px
}

.avatar-xl.avatar-away::before,
.avatar-xl.avatar-offline::before,
.avatar-xl.avatar-online::before {
  border-width: 4px
}

.avatar-xxl {
  width: 5.125rem;
  height: 5.125rem
}

.avatar-xxl .border {
  border-width: 6px !important
}

.avatar-xxl .rounded {
  border-radius: 8px !important
}

.avatar-xxl .avatar-title {
  font-size: 30px
}

.avatar-xxl.avatar-away::before,
.avatar-xxl.avatar-offline::before,
.avatar-xxl.avatar-online::before {
  border-width: 4px
}

@media (min-width:768px) {
  .avatar-xxl {
    width: 8rem;
    height: 8rem
  }

  .avatar-xxl .border {
    border-width: 4px !important
  }

  .avatar-xxl .rounded {
    border-radius: 12px !important
  }

  .avatar-xxl .avatar-title {
    font-size: 42px
  }

  .avatar-xxl.avatar-away::before,
  .avatar-xxl.avatar-offline::before,
  .avatar-xxl.avatar-online::before {
    border-width: 4px
  }
}

.avatar-group {
  display: inline-flex
}

.avatar-group .avatar+.avatar {
  margin-left: -.75rem
}

.avatar-group .avatar-xs+.avatar-xs {
  margin-left: -.40625rem
}

.avatar-group .avatar-sm+.avatar-sm {
  margin-left: -.625rem
}

.avatar-group .avatar-lg+.avatar-lg {
  margin-left: -1rem
}

.avatar-group .avatar-xl+.avatar-xl {
  margin-left: -1.28125rem
}

.avatar-group .avatar:hover {
  z-index: 1
}

.border-dark {
  border-color: #202940 !important
}

.breadcrumbs {
  list-style: none;
  display: inline;
  width: auto;
  border-left: 1px solid #efefef;
  margin-left: 25px;
  padding-left: 25px;
  margin-bottom: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%
}

.breadcrumbs li {
  display: inline-block
}

.breadcrumbs li a {
  color: #575962;
  font-size: 13px
}

.breadcrumbs li a i {
  font-size: 16px
}

.breadcrumbs li a:hover {
  text-decoration: none
}

.breadcrumbs li.separator {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px
}

.card,
.card-light {
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 30px;
  -webkit-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  -moz-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  border: 0
}

.card .card-header,
.card-light .card-header {
  padding: 1rem 1.25rem;
  background-color: transparent;
  border-bottom: 1px solid #ebecec !important
}

.card .card-header:first-child,
.card-light .card-header:first-child {
  border-radius: 0
}

.card .card-header .card-head-row,
.card-light .card-header .card-head-row {
  display: flex;
  align-items: center
}

.card .card-header .card-head-row .card-tools,
.card-light .card-header .card-head-row .card-tools {
  margin-left: auto;
  float: right;
  padding-left: 15px
}

.card .separator-solid,
.card-light .separator-solid {
  border-top: 1px solid #ebecec;
  margin: 15px 0
}

.card .separator-dashed,
.card-light .separator-dashed {
  border-top: 1px dashed #ebecec;
  margin: 15px 0
}

.card .separator-dot,
.card-light .separator-dot {
  border-top: 1px dotted #ebecec;
  margin: 15px 0
}

.card .full-width-separator,
.card-light .full-width-separator {
  margin: 15px -20px 15px
}

.card .b-b1,
.card-light .b-b1 {
  border-bottom: 1px solid rgba(255, 255, 255, .3)
}

.card .card-body,
.card-light .card-body {
  padding: 1.25rem
}

.card .card-footer,
.card-light .card-footer {
  background-color: transparent;
  line-height: 30px;
  border-top: 1px solid #ebecec !important;
  font-size: 13px
}

.card .pull-in,
.card-light .pull-in {
  margin-left: -1.25rem;
  margin-right: -1.25rem
}

.card .pull-in.sparkline-fix,
.card-light .pull-in.sparkline-fix {
  margin-left: -1.35rem;
  margin-right: -1.35rem;
  margin-bottom: -3px
}

.card .chart-as-background,
.card-light .chart-as-background {
  position: absolute;
  bottom: 0;
  width: calc(100% + 2px)
}

.card .card-action,
.card-light .card-action {
  padding: 30px;
  background-color: transparent;
  line-height: 30px;
  border-top: 1px solid #ebecec !important;
  font-size: 14px
}

.card .card-footer hr,
.card-light .card-footer hr {
  margin-top: 5px;
  margin-bottom: 5px
}

.card .card-footer .legend,
.card-light .card-footer .legend {
  display: inline-block
}

@media screen and (max-width:476px) {
  .card .card-header .card-head-row:not(.card-tools-still-right) {
    flex-direction: column;
    align-items: unset
  }

  .card .card-header .card-head-row:not(.card-tools-still-right) .card-tools {
    margin-left: 0;
    float: left;
    padding-left: 0;
    padding-top: 10px
  }
}

.card.full-height {
  height: calc(100% - 30px)
}

.card-space {
  padding: 0 30px
}

.card-space>.card-action,
.card-space>.card-body,
.card-space>.card-footer,
.card-space>.card-header {
  padding-left: 0 !important;
  padding-right: 0 !important
}

.card-with-nav .card-header {
  border-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important
}

.card-with-nav .card-body {
  padding: 15px 25px !important
}

.card-list {
  padding: 10px 0
}

.card-list .item-list {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  align-items: center
}

.card-list .item-list .info-user {
  flex: 1
}

.card-list .item-list .info-user .username,
.card-list .item-list .info-user a.username {
  color: #1572e8;
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: 400
}

.card-list .item-list .info-user .status {
  font-size: 11px;
  color: #7d7b7b
}

.card-title {
  margin: 0;
  color: #575962;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6
}

.card-title a,
.card-title a:focus,
.card-title a:hover {
  color: #575962;
  text-decoration: none
}

.card-sub {
  display: block;
  margin: 5px 0 10px 0;
  font-size: .9rem;
  background: #f7f8fa;
  color: #575962;
  padding: .85rem 1.5rem;
  border-radius: 4px;
  line-height: 1.82
}

.card-category {
  margin-top: 8px;
  font-size: 14px;
  color: #8d9498;
  margin-bottom: 0;
  word-break: normal
}

label {
  font-size: 14px;
  font-weight: 400;
  color: #8d9498;
  margin-bottom: 0
}

.card-transparent {
  background: 0 0 !important;
  box-shadow: none;
  border-color: transparent !important
}

.card-stats .card-body {
  padding: 15px !important
}

.card-stats .card-title {
  margin-bottom: 0 !important
}

.card-stats .card-category {
  margin-top: 0
}

.card-stats .col-icon {
  width: 65px;
  height: 65px;
  margin-left: 15px
}

.card-stats .icon-big {
  width: 100%;
  height: 100%;
  font-size: 2.2em;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center
}

.card-stats .icon-big.icon-danger,
.card-stats .icon-big.icon-default,
.card-stats .icon-big.icon-info,
.card-stats .icon-big.icon-primary,
.card-stats .icon-big.icon-secondary,
.card-stats .icon-big.icon-success,
.card-stats .icon-big.icon-warning {
  border-radius: 5px
}

.card-stats .icon-big.icon-danger i,
.card-stats .icon-big.icon-default i,
.card-stats .icon-big.icon-info i,
.card-stats .icon-big.icon-primary i,
.card-stats .icon-big.icon-secondary i,
.card-stats .icon-big.icon-success i,
.card-stats .icon-big.icon-warning i {
  color: #fff !important
}

.card-stats .icon-big.icon-default {
  background: #1a2035
}

.card-stats .icon-big.icon-primary {
  background: #1572e8
}

.card-stats .icon-big.icon-secondary {
  background: #6861ce
}

.card-stats .icon-big.icon-success {
  background: #31ce36
}

.card-stats .icon-big.icon-warning {
  background: #ffad46
}

.card-stats .icon-big.icon-info {
  background: #48abf7
}

.card-stats .icon-big.icon-danger {
  background: #f25961
}

.card-stats .icon-big.round {
  border-radius: 50% !important
}

.card-stats .col-stats {
  align-items: center;
  display: flex;
  padding-left: 15px
}

.card-tasks .table {
  margin-bottom: 0
}

.card-tasks .table .form-check {
  padding: 0 0 0 .75rem !important
}

.card-tasks .table .form-check label {
  margin-bottom: 0 !important
}

.card-tasks .table tbody td:first-child,
.card-tasks .table thead th:first-child {
  padding-left: 15px;
  padding-right: 15px
}

.card-tasks .table tbody td:last-child,
.card-tasks .table thead th:last-child {
  padding-right: 15px
}

.card-tasks .table tbody tr:last-child td {
  border-bottom-width: 0 !important
}

.card-tasks .card-body {
  padding-top: 0;
  padding-bottom: 0
}

.card-tasks .card-body .table td {
  font-size: 13px
}

.card-tasks .card-body .table td .btn {
  font-size: 15px;
  opacity: .7;
  transition: all .3s
}

.card-tasks .card-body .table td:hover .btn {
  opacity: 1
}

.card-tasks .form-button-action {
  display: block !important
}

.card-danger,
.card-dark,
.card-default,
.card-info,
.card-primary,
.card-secondary,
.card-success,
.card-warning {
  color: #fff;
  border: 0
}

.card-danger .card-header,
.card-dark .card-header,
.card-default .card-header,
.card-info .card-header,
.card-primary .card-header,
.card-secondary .card-header,
.card-success .card-header,
.card-warning .card-header {
  border-bottom: transparent !important
}

.card-danger .card-category,
.card-danger .card-title,
.card-danger label,
.card-dark .card-category,
.card-dark .card-title,
.card-dark label,
.card-default .card-category,
.card-default .card-title,
.card-default label,
.card-info .card-category,
.card-info .card-title,
.card-info label,
.card-primary .card-category,
.card-primary .card-title,
.card-primary label,
.card-secondary .card-category,
.card-secondary .card-title,
.card-success .card-category,
.card-success .card-title,
.card-success label,
.card-warning .card-category,
.card-warning .card-title,
.card-warning label {
  color: #fff
}

.card-danger .icon-big>i,
.card-dark .icon-big>i,
.card-default .icon-big>i,
.card-info .icon-big>i,
.card-primary .icon-big>i,
.card-secondary .icon-big>i,
.card-success .icon-big>i,
.card-warning .icon-big>i {
  color: #fff !important
}

.card-danger .card-footer,
.card-dark .card-footer,
.card-default .card-footer,
.card-info .card-footer,
.card-primary .card-footer,
.card-secondary .card-footer,
.card-success .card-footer,
.card-warning .card-footer {
  border-top: transparent !important
}

.card-default {
  background: #1a2035 !important
}

.card-primary {
  background: #1572e8 !important
}

.card-secondary {
  background: #6861ce !important
}

.card-info {
  background: #48abf7 !important
}

.card-success {
  background: #31ce36 !important
}

.card-warning {
  background: #ffad46 !important
}

.card-danger {
  background: #f25961 !important
}

.card-round {
  border-radius: 5px
}

.progress-card {
  margin-bottom: 25px
}

.progress-card .progress-status {
  display: flex;
  margin-bottom: 10px;
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important
}

.card-post .info-post .username {
  margin-bottom: 0;
  font-weight: 600
}

.card-post .info-post .date {
  margin-bottom: 0
}

.card-pricing {
  padding: 20px 5px;
  text-align: center;
  border-radius: 5px
}

.card-pricing .card-header {
  border-bottom: 0 !important
}

.card-pricing .card-footer {
  border-top: 0 !important;
  padding: 15px 15px 10px 15px
}

.card-pricing .card-title {
  font-weight: 400;
  font-size: 20px
}

.card-pricing .card-price .price {
  font-size: 36px;
  font-weight: 400
}

.card-pricing .card-price .text {
  font-size: 18px;
  font-weight: 400;
  color: #d1d7e3
}

.card-pricing .specification-list {
  list-style: none;
  padding-left: 0
}

.card-pricing .specification-list li {
  padding: 8px 0 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
  font-size: 12px;
  margin-bottom: 5px
}

.card-pricing .specification-list li .name-specification {
  color: #83848a
}

.card-pricing .specification-list li .status-specification {
  margin-left: auto;
  float: right;
  font-weight: 400
}

.card-pricing.card-pricing-focus {
  padding: 40px 5px
}

.card-pricing.card-danger .name-specification,
.card-pricing.card-default .name-specification,
.card-pricing.card-info .name-specification,
.card-pricing.card-primary .name-specification,
.card-pricing.card-secondary .name-specification,
.card-pricing.card-success .name-specification,
.card-pricing.card-warning .name-specification {
  color: #fff !important
}

.card-pricing.card-primary .specification-list li {
  border-color: #2f8bff !important
}

.card-pricing.card-primary .btn-light {
  color: #1572e8 !important
}

.card-pricing.card-success .specification-list li {
  border-color: #64e069 !important
}

.card-pricing.card-success .btn-light {
  color: #31ce36 !important
}

.card-pricing.card-secondary .specification-list li {
  border-color: #7f77dc !important
}

.card-pricing.card-secondary .btn-light {
  color: #6861ce !important
}

.card-pricing.card-default .specification-list li {
  border-color: #6f8996 !important
}

.card-pricing.card-default .btn-light {
  color: #1a2035 !important
}

.card-pricing.card-info .specification-list li {
  border-color: #11c0e4 !important
}

.card-pricing.card-info .btn-light {
  color: #48abf7 !important
}

.card-pricing.card-danger .specification-list li {
  border-color: #ff6972 !important
}

.card-pricing.card-danger .btn-light {
  color: #f25961 !important
}

.card-pricing.card-warning .specification-list li {
  border-color: #ffbc67 !important
}

.card-pricing.card-warning .btn-light {
  color: #ffad46 !important
}

.card-pricing2 {
  padding-bottom: 10px;
  background: #fff !important;
  border-bottom: 7px solid;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 15px 1px rgba(69, 65, 78, .08);
  -moz-box-shadow: 0 1px 15px 1px rgba(69, 65, 78, .08);
  box-shadow: 0 1px 15px 1px rgba(69, 65, 78, .08)
}

.card-pricing2:before {
  content: "";
  width: 100%;
  height: 350px;
  position: absolute;
  top: -150px;
  left: 0;
  transform: skewY(-20deg)
}

.card-pricing2 .price-value:after,
.card-pricing2 .price-value:before {
  content: "";
  left: 50%;
  transform: translateX(-50%) scaleY(.5) rotate(45deg)
}

.card-pricing2 .value:after,
.card-pricing2 .value:before {
  content: "";
  left: 50%;
  transform: translateX(-50%) scaleY(.5) rotate(45deg)
}

.card-pricing2 .pricing-header {
  padding: 20px 20px 60px;
  text-align: left;
  position: relative
}

.card-pricing2 .sub-title {
  display: block;
  font-size: 16px
}

.card-pricing2 .value {
  background: #fff
}

.card-pricing2 .price-value {
  display: inline-block;
  width: 170px;
  height: 110px;
  padding: 15px;
  border: 2px solid;
  border-top: none;
  border-bottom: none;
  position: relative
}

.card-pricing2 .price-value:after,
.card-pricing2 .price-value:before {
  width: 121px;
  height: 121px;
  border: 3px solid;
  border-right: none;
  border-bottom: none;
  position: absolute;
  top: -60px
}

.card-pricing2 .price-value:after {
  border-top: none;
  border-left: none;
  border-bottom: 3px solid;
  border-right: 3px solid;
  top: auto;
  bottom: -60px
}

.card-pricing2 .value {
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-top: none;
  border-bottom: none;
  z-index: 1;
  position: relative
}

.card-pricing2 .value:after,
.card-pricing2 .value:before {
  width: 97px;
  height: 97px;
  background: #fff;
  border: 3px solid;
  border-bottom: none;
  border-right: none;
  position: absolute;
  top: -48px;
  z-index: -1
}

.card-pricing2 .value:after {
  border-right: 3px solid;
  border-bottom: 3px solid;
  border-top: none;
  border-left: none;
  top: auto;
  bottom: -48px
}

.card-pricing2 .currency {
  display: inline-block;
  font-size: 30px;
  margin-top: 7px;
  vertical-align: top
}

.card-pricing2 .amount {
  display: inline-block;
  font-size: 40px;
  font-weight: 600;
  line-height: 65px
}

.card-pricing2 .amount span {
  display: inline-block;
  font-size: 30px;
  font-weight: 400;
  vertical-align: top;
  margin-top: -7px
}

.card-pricing2 .month {
  display: block;
  font-size: 16px;
  line-height: 0
}

.card-pricing2 .pricing-content {
  padding: 50px 0 0 80px;
  margin-bottom: 20px;
  list-style: none;
  text-align: left;
  transition: all .3s ease 0s
}

.card-pricing2 .pricing-content li {
  padding: 7px 0;
  font-size: 13px;
  color: grey;
  position: relative
}

.card-pricing2 .pricing-content li.disable:before,
.card-pricing2 .pricing-content li:before {
  content: "\f00c";
  font-family: 'Font Awesome 5 Solid';
  font-weight: 900;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background: #98c458;
  text-align: center;
  color: #fff;
  position: absolute;
  left: -50px;
  font-size: 9px
}

.card-pricing2 .pricing-content li.disable:before {
  content: "\f00d";
  background: #fe6c6c
}

.card-pricing2.card-default {
  border-bottom-color: #1a2035
}

.card-pricing2.card-default .price-value:before,
.card-pricing2.card-default .value:before {
  border-left-color: #1a2035;
  border-top-color: #1a2035
}

.card-pricing2.card-default .price-value,
.card-pricing2.card-default .value {
  border-right-color: #1a2035
}

.card-pricing2.card-default .price-value:after,
.card-pricing2.card-default .value:after {
  border-right-color: #1a2035
}

.card-pricing2.card-default .price-value:after,
.card-pricing2.card-default .value:after {
  border-bottom-color: #1a2035
}

.card-pricing2.card-default .value {
  color: #1a2035
}

.card-pricing2.card-default:before {
  background: #1a2035
}

.card-pricing2.card-default .price-value,
.card-pricing2.card-default .value {
  border-left-color: #1a2035
}

.card-pricing2.card-primary {
  border-bottom-color: #1572e8
}

.card-pricing2.card-primary .price-value:before,
.card-pricing2.card-primary .value:before {
  border-left-color: #1572e8;
  border-top-color: #1572e8
}

.card-pricing2.card-primary .price-value,
.card-pricing2.card-primary .value {
  border-right-color: #1572e8
}

.card-pricing2.card-primary .price-value:after,
.card-pricing2.card-primary .value:after {
  border-right-color: #1572e8
}

.card-pricing2.card-primary .price-value:after,
.card-pricing2.card-primary .value:after {
  border-bottom-color: #1572e8
}

.card-pricing2.card-primary .value {
  color: #1572e8
}

.card-pricing2.card-primary:before {
  background: #1572e8
}

.card-pricing2.card-primary .price-value,
.card-pricing2.card-primary .value {
  border-left-color: #1572e8
}

.card-pricing2.card-secondary {
  border-bottom-color: #6861ce
}

.card-pricing2.card-secondary .price-value:before,
.card-pricing2.card-secondary .value:before {
  border-left-color: #6861ce;
  border-top-color: #6861ce
}

.card-pricing2.card-secondary .price-value,
.card-pricing2.card-secondary .value {
  border-right-color: #6861ce
}

.card-pricing2.card-secondary .price-value:after,
.card-pricing2.card-secondary .value:after {
  border-right-color: #6861ce
}

.card-pricing2.card-secondary .price-value:after,
.card-pricing2.card-secondary .value:after {
  border-bottom-color: #6861ce
}

.card-pricing2.card-secondary .value {
  color: #6861ce
}

.card-pricing2.card-secondary:before {
  background: #6861ce
}

.card-pricing2.card-secondary .price-value,
.card-pricing2.card-secondary .value {
  border-left-color: #6861ce
}

.card-pricing2.card-info {
  border-bottom-color: #48abf7
}

.card-pricing2.card-info .price-value:before,
.card-pricing2.card-info .value:before {
  border-left-color: #48abf7;
  border-top-color: #48abf7
}

.card-pricing2.card-info .price-value,
.card-pricing2.card-info .value {
  border-right-color: #48abf7
}

.card-pricing2.card-info .price-value:after,
.card-pricing2.card-info .value:after {
  border-right-color: #48abf7
}

.card-pricing2.card-info .price-value:after,
.card-pricing2.card-info .value:after {
  border-bottom-color: #48abf7
}

.card-pricing2.card-info .value {
  color: #48abf7
}

.card-pricing2.card-info:before {
  background: #48abf7
}

.card-pricing2.card-info .price-value,
.card-pricing2.card-info .value {
  border-left-color: #48abf7
}

.card-pricing2.card-success {
  border-bottom-color: #31ce36
}

.card-pricing2.card-success .price-value:before,
.card-pricing2.card-success .value:before {
  border-left-color: #31ce36;
  border-top-color: #31ce36
}

.card-pricing2.card-success .price-value,
.card-pricing2.card-success .value {
  border-right-color: #31ce36
}

.card-pricing2.card-success .price-value:after,
.card-pricing2.card-success .value:after {
  border-right-color: #31ce36
}

.card-pricing2.card-success .price-value:after,
.card-pricing2.card-success .value:after {
  border-bottom-color: #31ce36
}

.card-pricing2.card-success .value {
  color: #31ce36
}

.card-pricing2.card-success:before {
  background: #31ce36
}

.card-pricing2.card-success .price-value,
.card-pricing2.card-success .value {
  border-left-color: #31ce36
}

.card-pricing2.card-warning {
  border-bottom-color: #ffad46
}

.card-pricing2.card-warning .price-value:before,
.card-pricing2.card-warning .value:before {
  border-left-color: #ffad46;
  border-top-color: #ffad46
}

.card-pricing2.card-warning .price-value,
.card-pricing2.card-warning .value {
  border-right-color: #ffad46
}

.card-pricing2.card-warning .price-value:after,
.card-pricing2.card-warning .value:after {
  border-right-color: #ffad46
}

.card-pricing2.card-warning .price-value:after,
.card-pricing2.card-warning .value:after {
  border-bottom-color: #ffad46
}

.card-pricing2.card-warning .value {
  color: #ffad46
}

.card-pricing2.card-warning:before {
  background: #ffad46
}

.card-pricing2.card-warning .price-value,
.card-pricing2.card-warning .value {
  border-left-color: #ffad46
}

.card-pricing2.card-danger {
  border-bottom-color: #f25961
}

.card-pricing2.card-danger .price-value:before,
.card-pricing2.card-danger .value:before {
  border-left-color: #f25961;
  border-top-color: #f25961
}

.card-pricing2.card-danger .price-value,
.card-pricing2.card-danger .value {
  border-right-color: #f25961
}

.card-pricing2.card-danger .price-value:after,
.card-pricing2.card-danger .value:after {
  border-right-color: #f25961
}

.card-pricing2.card-danger .price-value:after,
.card-pricing2.card-danger .value:after {
  border-bottom-color: #f25961
}

.card-pricing2.card-danger .value {
  color: #f25961
}

.card-pricing2.card-danger:before {
  background: #f25961
}

.card-pricing2.card-danger .price-value,
.card-pricing2.card-danger .value {
  border-left-color: #f25961
}

.row-cardProduct {
  padding: 0 5px;
  white-space: nowrap;
  overflow-x: auto;
  display: block !important;
  margin-right: -2rem;
  width: unset !important
}

.col-cardProduct {
  width: 225px;
  padding: 0 10px;
  display: inline-block
}

.card-product {
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 7px 15px rgba(0, 0, 0, .12);
  margin-bottom: 15px
}

.card-product .product-summary {
  padding: 15px
}

@media screen and (max-width:768px) {
  .col-cardProduct {
    width: 175px
  }

  .card-product .title-product {
    font-size: 14px
  }

  .card-product .price-product {
    font-size: 18px
  }
}

.skew-shadow {
  position: relative;
  overflow: hidden
}

.skew-shadow:before {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, .1);
  width: 50%;
  min-width: 150px;
  height: 100%;
  top: 0;
  right: -25%;
  transform: skewX(-32.5deg)
}

.bubble-shadow {
  position: relative;
  overflow: hidden
}

.bubble-shadow:before {
  position: absolute;
  top: -10%;
  right: -140px;
  width: 300px;
  height: 300px;
  content: "";
  border-radius: 50%;
  background: rgba(255, 255, 255, .05)
}

.bubble-shadow:after {
  position: absolute;
  top: -65px;
  right: 80px;
  width: 150px;
  height: 150px;
  content: "";
  border-radius: 50%;
  background: rgba(255, 255, 255, .05)
}

.curves-shadow {
  position: relative;
  overflow: hidden
}

.curves-shadow:before {
  content: '';
  position: absolute;
  /* background: url(../img/img-shadow.png); */
  background-size: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0
}

@media only screen and (max-width:990px) {
  .card-pricing2 {
    margin-bottom: 30px
  }
}

@media only screen and (max-width:767px) {
  .card-pricing2:before {
    transform: skewY(-15deg)
  }
}

.card-annoucement .card-body {
  padding: 50px 25px
}

.card-annoucement .card-opening {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: .01em
}

.card-annoucement .card-desc {
  padding: 15px 0;
  font-size: 16px;
  line-height: 1.65;
  font-weight: 300
}

.card-annoucement.card-primary .btn-light {
  color: #1572e8 !important
}

.card-annoucement.card-success .btn-light {
  color: #31ce36 !important
}

.card-annoucement.card-secondary .btn-light {
  color: #6861ce !important
}

.card-annoucement.card-default .btn-light {
  color: #1a2035 !important
}

.card-annoucement.card-info .btn-light {
  color: #48abf7 !important
}

.card-annoucement.card-danger .btn-light {
  color: #f25961 !important
}

.card-annoucement.card-warning .btn-light {
  color: #ffad46 !important
}

.card-profile {
  color: #575962
}

.card-profile .profile-picture {
  text-align: center;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -41px;
  width: 100%;
  box-sizing: border-box
}

.card-profile .user-profile .name {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px
}

.card-profile .user-profile .job {
  color: #83848a;
  margin-bottom: 5px
}

.card-profile .user-profile .desc {
  color: #bbb;
  margin-bottom: 15px
}

.card-profile .user-profile .social-media {
  margin-bottom: 20px
}

.card-profile .user-profile .social-media .btn {
  padding: 5px !important
}

.card-profile .user-profile .social-media .btn i {
  font-size: 22px !important
}

.card-profile .user-stats {
  margin-bottom: 10px
}

.card-profile .user-stats [class^=col] {
  border-right: 1px solid #ebebeb
}

.card-profile .user-stats [class^=col]:last-child {
  border-right: 0
}

.card-profile .user-stats .number {
  font-weight: 400;
  font-size: 15px
}

.card-profile .user-stats .title {
  color: #7d7b7b
}

.card-profile .card-header {
  border-bottom: 0;
  height: 100px;
  position: relative
}

.card-profile .card-body {
  padding-top: 60px
}

.card-profile .card-footer {
  border-top: 0
}

.card-profile.card-secondary .card-header {
  background: #6861ce
}

.row-card-no-pd {
  border-radius: 5px;
  margin-left: 0;
  margin-right: 0;
  background: #fff;
  margin-bottom: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
  -webkit-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  -moz-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
  border: 0
}

.row-card-no-pd .card {
  margin-bottom: 0;
  border-width: 0;
  box-shadow: none;
  position: unset
}

.row-card-no-pd .card .card-header {
  padding-left: 0 !important;
  padding-top: 0 !important;
  padding-right: 0 !important
}

.row-card-no-pd [class*=col] .card:before {
  position: absolute;
  height: calc(100%);
  width: 1px;
  background: #eee;
  content: '';
  right: 0
}

.row-card-no-pd [class*=col]:last-child .card:before {
  width: 0
}

.accordion .card {
  border-radius: 5px !important;
  background: #f7f7f7 !important;
  color: #575962 !important;
  border: 0;
  box-shadow: none
}

.accordion .card .span-icon {
  font-size: 22px;
  padding-left: 15px;
  padding-right: 15px
}

.accordion .card>.card-header {
  border: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 0 !important
}

.accordion .card>.card-header>.span-mode {
  margin-left: auto
}

.accordion .card>.card-header>.span-mode:before {
  content: "\f068" !important;
  font-family: 'Font Awesome 5 Solid';
  font-weight: 900;
  font-size: 16px
}

.accordion .card>.card-header.collapsed>.span-mode:before {
  content: "\f067" !important
}

.accordion .card .card-body {
  border-top: 1px solid #ebebeb;
  padding: 30px
}

.accordion.accordion-danger .card .card-header,
.accordion.accordion-danger .card .card-header .btn-link,
.accordion.accordion-default .card .card-header,
.accordion.accordion-default .card .card-header .btn-link,
.accordion.accordion-info .card .card-header,
.accordion.accordion-info .card .card-header .btn-link,
.accordion.accordion-primary .card .card-header,
.accordion.accordion-primary .card .card-header .btn-link,
.accordion.accordion-secondary .card .card-header,
.accordion.accordion-secondary .card .card-header .btn-link,
.accordion.accordion-success .card .card-header,
.accordion.accordion-success .card .card-header .btn-link,
.accordion.accordion-warning .card .card-header,
.accordion.accordion-warning .card .card-header .btn-link {
  font-size: 14px
}

.accordion.accordion-default .card .card-header {
  color: #1a2035
}

.accordion.accordion-default .card .card-header .btn-link {
  color: #1a2035 !important
}

.accordion.accordion-primary .card .card-header {
  color: #1572e8
}

.accordion.accordion-primary .card .card-header .btn-link {
  color: #1572e8 !important
}

.accordion.accordion-secondary .card .card-header {
  color: #6861ce
}

.accordion.accordion-secondary .card .card-header .btn-link {
  color: #6861ce !important
}

.accordion.accordion-info .card .card-header {
  color: #48abf7
}

.accordion.accordion-info .card .card-header .btn-link {
  color: #48abf7 !important
}

.accordion.accordion-success .card .card-header {
  color: #31ce36
}

.accordion.accordion-success .card .card-header .btn-link {
  color: #31ce36 !important
}

.accordion.accordion-warning .card .card-header {
  color: #ffad46
}

.accordion.accordion-warning .card .card-header .btn-link {
  color: #ffad46 !important
}

.accordion.accordion-danger .card .card-header {
  color: #f25961
}

.accordion.accordion-danger .card .card-header .btn-link {
  color: #f25961 !important
}

.border-transparent {
  border-color: transparent !important
}

.gutters-0 {
  margin-right: 0;
  margin-left: 0
}

.gutters-0>.col,
.gutters-0>[class*=col-] {
  padding-right: 0;
  padding-left: 0
}

.gutters-0 .card {
  margin-bottom: 0
}

.gutters-xs {
  margin-right: -.25rem;
  margin-left: -.25rem
}

.gutters-xs>.col,
.gutters-xs>[class*=col-] {
  padding-right: .25rem;
  padding-left: .25rem
}

.gutters-xs .card {
  margin-bottom: .5rem
}

.gutters-sm {
  margin-right: -.5rem;
  margin-left: -.5rem
}

.gutters-sm>.col,
.gutters-sm>[class*=col-] {
  padding-right: .5rem;
  padding-left: .5rem
}

.gutters-sm .card {
  margin-bottom: 1rem
}

.gutters-lg {
  margin-right: -1rem;
  margin-left: -1rem
}

.gutters-lg>.col,
.gutters-lg>[class*=col-] {
  padding-right: 1rem;
  padding-left: 1rem
}

.gutters-lg .card {
  margin-bottom: 2rem
}

.gutters-xl {
  margin-right: -1.5rem;
  margin-left: -1.5rem
}

.gutters-xl>.col,
.gutters-xl>[class*=col-] {
  padding-right: 1.5rem;
  padding-left: 1.5rem
}

.gutters-xl .card {
  margin-bottom: 3rem
}

.stamp {
  color: #fff;
  background: #6861ce;
  display: inline-block;
  min-width: 2rem;
  height: 2rem;
  padding: 0 .25rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 3px;
  font-weight: 600
}

.stamp-md {
  min-width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem
}

.form-control {
  font-size: 14px;
  border-color: #ebedf2;
  padding: .6rem 1rem;
  height: inherit !important
}

.form-control:focus {
  border-color: #3e93ff
}

.form-control-lg,
.input-group-lg>.form-control,
.input-group-lg>.input-group-append>.btn,
.input-group-lg>.input-group-append>.input-group-text,
.input-group-lg>.input-group-prepend>.btn,
.input-group-lg>.input-group-prepend>.input-group-text {
  padding: .5rem 1rem !important;
  font-size: 1.25rem !important
}

.form-control-sm,
.input-group-sm>.form-control,
.input-group-sm>.input-group-append>.btn,
.input-group-sm>.input-group-append>.input-group-text,
.input-group-sm>.input-group-prepend>.btn,
.input-group-sm>.input-group-prepend>.input-group-text {
  padding: .25rem .5rem !important;
  font-size: .875rem !important;
  line-height: 1.5
}

.form-control::-webkit-input-placeholder {
  color: inherit;
  opacity: .7
}

.form-control:-moz-placeholder {
  color: inherit;
  opacity: .7
}

.form-control::-moz-placeholder {
  color: inherit;
  opacity: .7
}

.form-control:-ms-input-placeholder {
  color: inherit;
  opacity: .7
}

.form-control::-ms-input-placeholder {
  color: inherit;
  opacity: .7
}

.input-group-text {
  border-color: #ebedf2 !important
}

.form-button-action {
  display: inline-flex
}

.form-check-label,
.form-radio-label {
  margin-right: 15px
}

.select-all-checkbox+.form-check-sign:before {
  background: #ccc !important;
  border-color: #ccc !important
}

.form-check [type=checkbox]:checked,
.form-check [type=checkbox]:not(:checked) {
  position: absolute;
  left: -9999px
}

.form-check [type=checkbox]+.form-check-sign,
.form-check [type=checkbox]:checked+.form-check-sign,
.form-check [type=checkbox]:not(:checked)+.form-check-sign {
  position: relative;
  padding-left: 2em;
  color: #575962;
  cursor: pointer
}

.form-check [type=checkbox]+.form-check-sign:before,
.form-check [type=checkbox]:checked+.form-check-sign:before,
.form-check [type=checkbox]:not(:checked)+.form-check-sign:before {
  content: '';
  position: absolute;
  left: 0;
  top: 1px;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  background: 0 0;
  border-radius: 4px
}

.form-check [type=checkbox]+.form-check-sign:after,
.form-check [type=checkbox]:checked+.form-check-sign:after,
.form-check [type=checkbox]:not(:checked)+.form-check-sign:after {
  content: "\f00c";
  display: inline-block;
  position: absolute;
  top: -1px;
  left: 2px;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 1.3em;
  line-height: .8;
  color: #1572e8;
  transition: all .2s;
  font-family: 'Font Awesome 5 Solid'
}

.form-check [type=checkbox]:not(:checked)+.form-check-sign:after {
  opacity: 0;
  transform: scale(0)
}

.form-check [type=checkbox]:checked+.form-check-sign {
  font-weight: 400
}

.form-check [type=checkbox]:checked+.form-check-sign:after {
  opacity: 1;
  transform: scale(1)
}

.form-check [type=checkbox]:disabled:not(:checked)+.form-check-sign:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #ddd
}

.form-check [type=checkbox]:disabled:checked+.form-check-sign:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #ddd
}

.form-check [type=checkbox]:disabled:checked+.form-check-sign:after {
  color: #999
}

.form-check [type=checkbox]:disabled+.form-check-sign {
  color: #aaa
}

.form-check [type=checkbox]:checked:focus+.form-check-sign:before,
.form-check [type=checkbox]:not(:checked):focus+.form-check-sign:before {
  border: 1px solid #ccc
}

.form-check-sign:hover:before {
  border: 1px solid #ccc !important
}

.form-check {
  padding-left: .75rem
}

.form-check-input {
  position: relative;
  margin-top: .3rem
}

.form-radio [type=radio]:checked,
.form-radio [type=radio]:not(:checked) {
  position: absolute;
  left: -9999px
}

.form-radio [type=radio]:checked+.form-radio-sign,
.form-radio [type=radio]:not(:checked)+.form-radio-sign {
  color: #575962;
  position: relative;
  padding-left: 2em;
  cursor: pointer;
  line-height: 22px;
  font-weight: 400
}

.form-radio [type=radio]:not(:checked)+.form-radio-sign:before {
  content: "\f18a";
  font-size: 22px;
  font-family: LineAwesome;
  position: absolute;
  left: 0;
  top: auto;
  background: 0 0;
  line-height: 1;
  color: #bbb
}

.form-radio [type=radio]:checked+.form-radio-sign:before {
  content: "\f18a";
  font-size: 22px;
  font-family: LineAwesome;
  position: absolute;
  left: 0;
  top: auto;
  background: 0 0;
  line-height: 1;
  display: none
}

.form-radio [type=radio]:checked+.form-radio-sign:after,
.form-radio [type=radio]:not(:checked)+.form-radio-sign:after {
  content: "\f1bc";
  position: absolute;
  left: 0;
  top: auto;
  text-align: center;
  font-size: 22px;
  color: #4d7cfe;
  transition: all .2s;
  line-height: 1;
  font-family: LineAwesome
}

.form-radio [type=radio]:not(:checked)+.form-radio-sign:after {
  opacity: 0;
  transform: scale(0)
}

.form-radio [type=radio]:checked+.form-radio-sign {
  font-weight: 400
}

.form-radio [type=radio]:checked+.form-radio-sign:after {
  opacity: 1;
  transform: scale(1)
}

.form-radio [type=radio]:disabled:not(:checked)+.form-radio-sign:before {
  box-shadow: none;
  opacity: .65
}

.form-radio [type=radio]:disabled:checked+.form-radio-sign:before {
  box-shadow: none;
  opacity: .65
}

.form-radio [type=radio]:disabled:checked+.form-radio-sign:after {
  opacity: .65
}

.form-radio [type=radio]:disabled+.form-radio-sign {
  color: #aaa;
  opacity: .65
}

.form-radio [type=radio]:checked:focus+.form-radio-sign:before,
.form-radio [type=radio]:not(:checked):focus+.form-radio-sign:before {
  border: 1px solid #ccc
}

.form-radio {
  padding-left: .75rem
}

.form-radio-input {
  position: relative;
  margin-top: .3rem
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
  background-color: #1572e8
}

.custom-checkbox.checkbox-default .custom-control-input:checked~.custom-control-label::before {
  background-color: #1a2035
}

.custom-checkbox.checkbox-primary .custom-control-input:checked~.custom-control-label::before {
  background-color: #1572e8
}

.custom-checkbox.checkbox-secondary .custom-control-input:checked~.custom-control-label::before {
  background-color: #6861ce
}

.custom-checkbox.checkbox-info .custom-control-input:checked~.custom-control-label::before {
  background-color: #48abf7
}

.custom-checkbox.checkbox-success .custom-control-input:checked~.custom-control-label::before {
  background-color: #31ce36
}

.custom-checkbox.checkbox-warning .custom-control-input:checked~.custom-control-label::before {
  background-color: #ffad46
}

.custom-checkbox.checkbox-danger .custom-control-input:checked~.custom-control-label::before {
  background-color: #f25961
}

.col-form-label {
  line-height: 1.8
}

.required-label {
  color: red
}

.label-align-left {
  text-align: left
}

.label-align-right {
  text-align: right
}

.label-align-center {
  text-align: center
}

.form-check,
.form-group {
  margin-bottom: 0;
  padding: 10px
}

.form-check label,
.form-group label {
  margin-bottom: .5rem;
  color: #495057;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap
}

.form-group-default {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .07);
  border-radius: 4px;
  padding-top: 7px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 4px;
  overflow: hidden;
  width: 100%;
  -webkit-transition: background-color .2s ease;
  transition: background-color .2s ease;
  margin-bottom: 15px
}

.form-group-default label {
  opacity: 1;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  margin: 0;
  display: block;
  -webkit-transition: opacity .2s ease;
  transition: opacity .2s ease
}

.form-group-default label:not(.error) {
  font-size: 10.5px !important;
  letter-spacing: .06em;
  text-transform: uppercase;
  font-weight: 400
}

.form-group-default .form-control {
  border: 0;
  min-height: 25px;
  padding: 0;
  margin-top: 6px;
  background: 0 0;
  font-size: 14px
}

.form-group-default select.form-control:not([size]):not([multiple]) {
  height: unset !important
}

.form-group-default.active {
  border-color: rgba(0, 0, 0, .1) !important;
  background-color: #f0f0f0
}

.form-group-default.active label {
  opacity: .5
}

.form-floating-label {
  position: relative
}

.form-floating-label .placeholder {
  position: absolute;
  padding: .375rem .75rem;
  transition: all .2s;
  opacity: .8;
  margin-bottom: 0 !important;
  font-size: 14px !important;
  font-weight: 400;
  top: 12px
}

.form-floating-label .form-control.filled+.placeholder,
.form-floating-label .form-control:focus+.placeholder,
.form-floating-label .form-control:valid+.placeholder {
  font-size: 85% !important;
  transform: translate3d(0, -10px, 0);
  top: 0;
  opacity: 1;
  padding: .375rem 0 .75rem;
  font-weight: 600
}

.form-floating-label .form-control.filled+.placeholder {
  color: #1572e8 !important
}

.form-floating-label .form-control ::-webkit-input-placeholder {
  color: transparent
}

.form-floating-label .form-control :-moz-placeholder {
  color: transparent
}

.form-floating-label .form-control ::-moz-placeholder {
  color: transparent
}

.form-floating-label .form-control :-ms-input-placeholder {
  color: transparent
}

.form-floating-label .input-border-bottom+.placeholder {
  padding: .375rem 0 .75rem
}

.form-inline label {
  margin-bottom: 0 !important
}

.input-fixed {
  width: 200px
}

.form-control.input-full {
  width: 100% !important
}

.has-success label {
  color: #31ce36 !important
}

.has-success .form-control {
  border-color: #31ce36 !important;
  color: #31ce36 !important
}

.has-success .input-group-text {
  border-color: #31ce36 !important;
  background: #31ce36 !important;
  color: #fff !important
}

.has-error label {
  color: #f25961 !important
}

.has-error .form-control {
  border-color: #f25961 !important;
  color: #f25961 !important
}

.has-error .input-group-text {
  border-color: #f25961 !important;
  background: #f25961 !important;
  color: #fff !important
}

.input-group label.error,
.input-group label.success {
  width: 100%;
  order: 100
}

.custom-control {
  position: relative
}

.custom-control.custom-checkbox,
.custom-control.custom-radio {
  margin-bottom: 0;
  padding-left: 2em;
  cursor: pointer;
  line-height: 24px;
  margin-right: 25px;
  display: inline-block
}

.custom-control.custom-checkbox label.error,
.custom-control.custom-checkbox label.success,
.custom-control.custom-radio label.error,
.custom-control.custom-radio label.success {
  position: absolute;
  width: 100vh;
  top: 23px;
  left: 0
}

.has-feedback {
  position: relative
}

.form-control-feedback {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px
}

.has-success .form-control-feedback {
  color: #31ce36
}

.has-error .form-control-feedback {
  color: #f25961
}

.input-group.has-icon {
  border-radius: .25rem;
  border: 1px solid #ced4da
}

.input-group.has-icon.has-success,
.input-group.has-success {
  border: 1px solid #31ce36 !important;
  color: #31ce36
}

.input-group.has-error {
  border: 1px solid #f25961 !important;
  color: #f25961
}

.input-group.has-icon.has-error {
  border: 1px solid #f25961 !important;
  color: #f25961
}

.input-group.has-icon .form-control {
  border-radius: .25rem;
  border: 0;
  position: relative
}

.input-group.has-icon .input-group-icon {
  background: 0 0;
  border: 0
}

.input-square {
  border-radius: 0 !important
}

.input-pill {
  border-radius: 1.3rem !important
}

.input-solid {
  background: #e8e8e8 !important;
  border-color: #e8e8e8 !important
}

.input-border-bottom {
  border-width: 0 0 1px 0;
  border-radius: 0;
  padding: .75rem 0;
  background: 0 0 !important
}

.input-file .form-control,
.input-file .form-control-file,
.input-file input[type=file] {
  width: .1px;
  height: .1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1
}

.input-file label.error,
.input-file label.success {
  display: block
}

.input-file .form-control+label:not(.error),
.input-file .form-control-file+label:not(.error),
.input-file .label-input-file,
.input-file input[type=file]+label:not(.error) {
  font-weight: 600;
  letter-spacing: .02em;
  color: #fff !important;
  display: inline-block
}

.input-file.input-file-image img.img-upload-preview {
  max-width: 100%;
  display: block;
  margin-bottom: 15px;
  box-shadow: 0 1px 15px 1px rgba(39, 39, 39, .1)
}

.input-file.input-file-image img.img-upload-preview.img-circle {
  border-radius: 2000px
}

.form-control:disabled,
.form-control[readonly] {
  background: #e8e8e8 !important;
  border-color: #e8e8e8 !important
}

.form-control:disabled,
.form-control[readonly] {
  opacity: .6 !important
}

.input-group-text {
  font-size: 14px
}

.input-group-text i.la {
  font-size: 21px
}

.input-group-text i[class*=flaticon] {
  font-size: 17px
}

.input-icon {
  position: relative
}

.input-icon .form-control:not(:first-child) {
  padding-left: 2.5rem
}

.input-icon .form-control:not(:last-child) {
  padding-right: 2.5rem
}

.input-icon .input-icon-addon {
  position: absolute;
  left: 1rem;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center
}

.input-icon .input-icon-addon:last-child {
  left: auto;
  right: 1rem
}

label.error {
  color: #f25961 !important;
  font-size: 80% !important;
  margin-top: .5rem
}

.select2-input {
  position: relative
}

.select2-input label.error,
.select2-input label.success {
  position: absolute;
  bottom: -30px
}

.select2-input .select2 {
  margin-bottom: 15px
}

.dropzone {
  padding: 70px 60px 80px !important;
  border: 2px dashed rgba(0, 0, 0, .13) !important;
  background: 0 0 !important
}

.dropzone:hover {
  background: #fafafa !important;
  transition: all .5s !important
}

.dropzone .dz-message .icon {
  margin-bottom: 15px;
  font-size: 39px
}

.dropzone .dz-message .message {
  font-size: 34px;
  font-weight: 200
}

.dropzone .dz-message .note {
  font-size: 16px;
  margin-top: 18px;
  font-weight: 300
}

.note-editor.note-frame {
  border: 0 !important;
  box-shadow: none !important
}

.note-editor.note-frame .note-toolbar {
  padding: 0 !important;
  border-bottom: 0 !important
}

.note-editor.note-frame .note-btn {
  border: 1px solid #eee !important;
  background: #fafafa !important
}

.note-editor.note-frame .note-placeholder {
  margin-top: 15px !important
}

.note-editor.note-frame .note-codable {
  margin-top: 15px !important
}

.note-editor.note-frame .note-editing-area .note-editable {
  margin-top: 15px !important;
  border: 1px solid #eee !important
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  vertical-align: middle
}

.table>tbody>tr>td,
.table>tbody>tr>th {
  padding: 8px
}

.table>tfoot>tr>td,
.table>tfoot>tr>th {
  padding: 8px
}

.table thead th {
  border-bottom-width: 2px;
  font-weight: 600
}

.table td,
.table th {
  font-size: 14px;
  border-top-width: 0;
  border-bottom: 1px solid;
  border-color: #ebedf2 !important;
  padding: 0 25px !important;
  height: 60px;
  vertical-align: middle !important
}

.table-full-width {
  margin-left: -15px;
  margin-right: -15px
}

.table-bordered-bd-default td,
.table-bordered-bd-default th {
  border: 1px solid #1a2035 !important
}

.table-bordered-bd-primary td,
.table-bordered-bd-primary th {
  border: 1px solid #1572e8 !important
}

.table-bordered-bd-secondary td,
.table-bordered-bd-secondary th {
  border: 1px solid #6861ce !important
}

.table-bordered-bd-info td,
.table-bordered-bd-info th {
  border: 1px solid #48abf7 !important
}

.table-bordered-bd-success td,
.table-bordered-bd-success th {
  border: 1px solid #31ce36 !important
}

.table-bordered-bd-warning td,
.table-bordered-bd-warning th {
  border: 1px solid #ffad46 !important
}

.table-bordered-bd-danger td,
.table-bordered-bd-danger th {
  border: 1px solid #f25961 !important
}

.table-striped td,
.table-striped th {
  border-top: 0 !important;
  border-bottom: 0 !important
}

.table-head-bg-default thead {
  border: 1px solid #1a2035 !important
}

.table-head-bg-primary thead {
  border: 1px solid #1572e8 !important
}

.table-head-bg-secondary thead {
  border: 1px solid #6861ce !important
}

.table-head-bg-info thead {
  border: 1px solid #48abf7 !important
}

.table-head-bg-success thead {
  border: 1px solid #31ce36 !important
}

.table-head-bg-warning thead {
  border: 1px solid #ffad46 !important
}

.table-head-bg-danger thead {
  border: 1px solid #f25961 !important
}

.table-head-bg-default thead th,
.table-striped-bg-default tbody tr:nth-of-type(odd) {
  background: #1a2035 !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-primary thead th,
.table-striped-bg-primary tbody tr:nth-of-type(odd) {
  background: #1572e8 !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-secondary thead th,
.table-striped-bg-secondary tbody tr:nth-of-type(odd) {
  background: #6861ce !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-info thead th,
.table-striped-bg-info tbody tr:nth-of-type(odd) {
  background: #48abf7 !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-success thead th,
.table-striped-bg-success tbody tr:nth-of-type(odd) {
  background: #31ce36 !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-warning thead th,
.table-striped-bg-warning tbody tr:nth-of-type(odd) {
  background: #ffad46 !important;
  color: #fff !important;
  border: 0 !important
}

.table-head-bg-danger thead th,
.table-striped-bg-danger tbody tr:nth-of-type(odd) {
  background: #f25961 !important;
  color: #fff !important;
  border: 0 !important
}

.table-responsive {
  width: 100% !important;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar
}

.navbar .navbar-nav .nav-item {
  margin-right: 7px
}

.navbar .navbar-nav .nav-item:last-child {
  margin-right: 0
}

.navbar .navbar-nav .nav-item .nav-link {
  display: inline-block;
  vertical-align: middle;
  color: #666;
  letter-spacing: .04em;
  padding: 10px;
  border-radius: 3px;
  position: relative;
  font-size: 12px;
  font-weight: 400;
  text-align: center
}

.navbar .navbar-nav .nav-item .nav-link:focus,
.navbar .navbar-nav .nav-item .nav-link:hover {
  background: #eee !important
}

.navbar .navbar-nav .nav-item .nav-link i {
  font-size: 18px;
  vertical-align: middle;
  line-height: 1 !important
}

.navbar .navbar-nav .nav-item.active .nav-link {
  background: #eee !important
}

.navbar-expand-lg .navbar-nav .dropdown-menu {
  left: auto;
  right: 0
}

.dropdown-item {
  font-size: 13px
}

.navbar .navbar-nav .notification {
  position: absolute;
  background-color: #31ce36;
  text-align: center;
  border-radius: 10px;
  min-width: 17px;
  height: 17px;
  font-size: 10px;
  color: #fff;
  font-weight: 300;
  line-height: 17px;
  top: 3px;
  right: 3px;
  letter-spacing: -1px
}

.navbar-header {
  padding: 0 15px
}

.navbar-header .dropdown-toggle::after {
  margin-left: 0
}

.profile-pic:focus,
.profile-pic:hover {
  text-decoration: none
}

.navbar-header .dropdown-toggle::after {
  vertical-align: middle;
  color: #555
}

.hidden-caret .dropdown-toggle::after {
  display: none !important
}

.profile-pic span {
  font-size: 13px;
  font-weight: 300;
  padding: 0 10px;
  color: #555
}

.navbar[class*=bg-] {
  border-bottom: 1px solid rgba(255, 255, 255, .2) !important;
  border-left: 1px solid rgba(255, 255, 255, .1) !important
}

.navbar[class*=bg-] .navbar-brand {
  color: #fff
}

.navbar[class*=bg-] .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")
}

.navbar[class*=bg-] .navbar-nav>.nav-item>.nav-link {
  color: #fff
}

.navbar[class*=bg-] .navbar-nav>.nav-item>.nav-link.disabled {
  color: #d8d8d8 !important
}

.navbar[class*=bg-] .navbar-nav>.nav-item>.nav-link:hover {
  background: rgba(255, 255, 255, .22) !important
}

.navbar[class*=bg-] .navbar-nav>.nav-item.active>.nav-link {
  background: rgba(255, 255, 255, .22) !important
}

.navbar[class*=bg-] .btn-toggle {
  background: rgba(19, 19, 19, .25) !important;
  color: #fff !important
}

.navbar[class*=bg-] .nav-search .input-group {
  border: 0;
  background: rgba(19, 19, 19, .25) !important
}

.navbar[class*=bg-] .nav-search .input-group .form-control {
  color: #fff !important
}

.navbar[class*=bg-] .nav-search .search-icon {
  color: #fff !important
}

.row-nav-line {
  margin-left: -20px;
  margin-right: -20px
}

.nav.nav-line {
  width: 100%;
  border-bottom: 1px solid #f1f1f1
}

.nav.nav-line .nav-link {
  padding: 15px 20px;
  color: #575962;
  border-width: 0;
  font-size: 14px;
  font-weight: 600
}

.nav.nav-line .nav-link:focus,
.nav.nav-line .nav-link:hover {
  color: #1572e8;
  border-width: 0
}

.nav.nav-line .nav-link.active {
  border-width: 0;
  background-color: transparent;
  color: #1572e8;
  border-bottom: 2px solid #1572e8;
  border-radius: 0
}

.nav.nav-line.nav-color-default .nav-link:focus,
.nav.nav-line.nav-color-default .nav-link:hover {
  color: #1a2035
}

.nav.nav-line.nav-color-default .nav-link.active {
  color: #1a2035;
  border-color: #1a2035
}

.nav.nav-line.nav-color-primary .nav-link:focus,
.nav.nav-line.nav-color-primary .nav-link:hover {
  color: #1572e8
}

.nav.nav-line.nav-color-primary .nav-link.active {
  color: #1572e8;
  border-color: #1572e8
}

.nav.nav-line.nav-color-secondary .nav-link:focus,
.nav.nav-line.nav-color-secondary .nav-link:hover {
  color: #6861ce
}

.nav.nav-line.nav-color-secondary .nav-link.active {
  color: #6861ce;
  border-color: #6861ce
}

.nav.nav-line.nav-color-info .nav-link:focus,
.nav.nav-line.nav-color-info .nav-link:hover {
  color: #48abf7
}

.nav.nav-line.nav-color-info .nav-link.active {
  color: #48abf7;
  border-color: #48abf7
}

.nav.nav-line.nav-color-success .nav-link:focus,
.nav.nav-line.nav-color-success .nav-link:hover {
  color: #31ce36
}

.nav.nav-line.nav-color-success .nav-link.active {
  color: #31ce36;
  border-color: #31ce36
}

.nav.nav-line.nav-color-danger .nav-link:focus,
.nav.nav-line.nav-color-danger .nav-link:hover {
  color: #f25961
}

.nav.nav-line.nav-color-danger .nav-link.active {
  color: #f25961;
  border-color: #f25961
}

.nav.nav-line.nav-color-warning .nav-link:focus,
.nav.nav-line.nav-color-warning .nav-link:hover {
  color: #ffad46
}

.nav.nav-line.nav-color-warning .nav-link.active {
  color: #ffad46;
  border-color: #ffad46
}

.nav.nav-line.nav-color-light .nav-link:focus,
.nav.nav-line.nav-color-light .nav-link:hover {
  color: #fff
}

.nav.nav-line.nav-color-light .nav-link.active {
  color: #fff;
  border-color: #fff
}

.nav.nav-line.nav-color-light .nav-link {
  color: #f1f1f1
}

.nav-search .input-group {
  border: 1px solid #eee;
  background: #eee;
  border-radius: 5px
}

.nav-search .input-group:focus,
.nav-search .input-group:hover {
  border: 1px solid #ddd
}

.nav-search .form-control {
  border: 0;
  background: 0 0 !important;
  font-size: 14px;
  padding: .75em 1em;
  min-width: 200px;
  max-width: 100%
}

.nav-search .input-group-text {
  border: 0;
  background: 0 0
}

.nav-search .search-icon {
  font-size: 18px;
  color: #8d9498
}

.nav-search .btn-search {
  background: 0 0;
  padding: .375rem 1rem
}

.badge {
  border-radius: 50px;
  margin-left: auto;
  line-height: 1;
  padding: 6px 10px;
  vertical-align: middle;
  font-weight: 400;
  font-size: 11px;
  border: 1px solid #ddd
}

[class*=badge-]:not(.badge-count) {
  border: 0 !important
}

.badge-default {
  background: #1a2035;
  color: #fff !important
}

.badge-primary {
  background: #1572e8
}

.badge-secondary {
  background: #6861ce
}

.badge-info {
  background: #48abf7
}

.badge-success {
  background-color: #31ce36
}

.badge-warning {
  background: #ffad46;
  color: #fff !important
}

.badge-danger {
  background-color: #f25961
}

.dropdown-menu {
  border: 0;
  border-radius: 3px;
  box-shadow: 0 1px 11px rgba(0, 0, 0, .15) !important;
  padding-bottom: 8px;
  margin-top: 3px
}

.dropdown-title {
  border-bottom: 1px solid #f1f1f1;
  color: #444;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 15px;
  text-align: center
}

.messages-notif-box,
.notif-box {
  width: 280px;
  padding: 0 !important
}

.messages-notif-box .notif-center a,
.notif-box .notif-center a {
  display: flex;
  color: #4d585f
}

.messages-notif-box .notif-center a:hover,
.notif-box .notif-center a:hover {
  text-decoration: none;
  background: #fafafa;
  transition: all .2s
}

.messages-notif-box .notif-center a .notif-icon,
.notif-box .notif-center a .notif-icon {
  display: inline-flex;
  width: 40px;
  height: 40px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 50%
}

.messages-notif-box .notif-center a .notif-img,
.notif-box .notif-center a .notif-img {
  display: inline-flex;
  width: 40px;
  height: 40px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 50%
}

.messages-notif-box .notif-center a .notif-img img,
.notif-box .notif-center a .notif-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%
}

.messages-notif-box .notif-center a .notif-icon.notif-danger,
.messages-notif-box .notif-center a .notif-icon.notif-default,
.messages-notif-box .notif-center a .notif-icon.notif-info,
.messages-notif-box .notif-center a .notif-icon.notif-primary,
.messages-notif-box .notif-center a .notif-icon.notif-secondary,
.messages-notif-box .notif-center a .notif-icon.notif-success,
.messages-notif-box .notif-center a .notif-icon.notif-warning,
.notif-box .notif-center a .notif-icon.notif-danger,
.notif-box .notif-center a .notif-icon.notif-default,
.notif-box .notif-center a .notif-icon.notif-info,
.notif-box .notif-center a .notif-icon.notif-primary,
.notif-box .notif-center a .notif-icon.notif-secondary,
.notif-box .notif-center a .notif-icon.notif-success,
.notif-box .notif-center a .notif-icon.notif-warning {
  color: #fff !important
}

.messages-notif-box .notif-center a .notif-icon.notif-default,
.notif-box .notif-center a .notif-icon.notif-default {
  background: #1a2035 !important
}

.messages-notif-box .notif-center a .notif-icon.notif-primary,
.notif-box .notif-center a .notif-icon.notif-primary {
  background: #1572e8 !important
}

.messages-notif-box .notif-center a .notif-icon.notif-secondary,
.notif-box .notif-center a .notif-icon.notif-secondary {
  background: #6861ce !important
}

.messages-notif-box .notif-center a .notif-icon.notif-info,
.notif-box .notif-center a .notif-icon.notif-info {
  background: #48abf7 !important
}

.messages-notif-box .notif-center a .notif-icon.notif-success,
.notif-box .notif-center a .notif-icon.notif-success {
  background: #31ce36 !important
}

.messages-notif-box .notif-center a .notif-icon.notif-warning,
.notif-box .notif-center a .notif-icon.notif-warning {
  background: #ffad46 !important
}

.messages-notif-box .notif-center a .notif-icon.notif-danger,
.notif-box .notif-center a .notif-icon.notif-danger {
  background: #f25961 !important
}

.messages-notif-box .notif-center a .notif-icon i,
.notif-box .notif-center a .notif-icon i {
  font-size: 15px
}

.messages-notif-box .notif-center a .notif-content,
.notif-box .notif-center a .notif-content {
  padding: 10px 15px 10px 0
}

.messages-notif-box .notif-center a .message-content,
.notif-box .notif-center a .message-content {
  padding: 7px 15px 10px 0
}

.messages-notif-box .notif-center a .notif-content .subject,
.notif-box .notif-center a .notif-content .subject {
  font-size: 13px;
  font-weight: 600;
  display: block;
  margin-bottom: 2px
}

.messages-notif-box .notif-center a .notif-content .block,
.notif-box .notif-center a .notif-content .block {
  font-size: 13px;
  line-height: 20px;
  display: block
}

.messages-notif-box .notif-center a .notif-content .time,
.notif-box .notif-center a .notif-content .time {
  color: #7d8c95;
  font-size: 11px
}

.messages-notif-box .see-all,
.notif-box .see-all {
  border-top: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: #555;
  font-size: 13px;
  font-weight: 400;
  text-decoration: none
}

.messages-notif-box .see-all:hover,
.notif-box .see-all:hover {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: #555;
  font-size: 13px;
  font-weight: 400;
  text-decoration: none
}

.messages-notif-box .see-all i,
.notif-box .see-all i {
  float: right
}

.notif-box .notif-scroll {
  max-height: 256px
}

.messages-notif-box .message-notif-scroll {
  max-height: 250px
}

.messages-notif-box .notif-center a {
  border-bottom: 1px solid #f1f1f1
}

.messages-notif-box .notif-center a:last-child {
  border-bottom: 0
}

.messages-notif-box .notif-center a .notif-content {
  padding: 7px 15px 7px 5px
}

.dropdown-user {
  width: 260px
}

.user-box {
  display: flex;
  padding: .25rem 1rem
}

.user-box .u-text {
  padding: 0 10px
}

.user-box .u-text h4 {
  margin-bottom: 5px;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1
}

.user-box .u-text .text-muted {
  font-size: 12px;
  margin-bottom: 5px
}

.user-box .u-text .btn {
  font-size: 11px
}

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent
}

.quick-actions {
  width: 350px;
  padding: 0
}

.quick-actions:after {
  border-bottom-color: #1572e8 !important
}

.quick-actions .quick-actions-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #1572e8;
  color: #fff;
  padding: 15px;
  border-radius: 3px 3px 0 0
}

.quick-actions .quick-actions-header .title {
  font-size: 18px
}

.quick-actions .quick-actions-header .subtitle {
  font-size: 13px
}

.quick-actions .quick-actions-items {
  padding: 15px 7.5px
}

.quick-actions a:hover {
  text-decoration: none
}

.quick-actions .quick-actions-item {
  display: flex;
  flex-direction: column;
  margin: 7.5px 7.5px;
  padding: 10px;
  align-items: center;
  color: #1572e8;
  border: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 3px;
  transition: all .2s
}

.quick-actions .quick-actions-item:hover {
  background: #fdfdff;
  color: #1572e8;
  box-shadow: 3px 3px 10px #f7f1f1
}

.quick-actions .quick-actions-item i {
  color: #7d8c95;
  font-size: 27px
}

.quick-actions .quick-actions-item .text {
  text-align: center;
  font-size: 13px;
  margin-top: 8px
}

.quick-actions.quick-actions-default:after {
  border-bottom-color: #1a2035 !important
}

.quick-actions.quick-actions-default .quick-actions-header {
  background: #1a2035
}

.quick-actions.quick-actions-default .quick-actions-item {
  color: #1a2035
}

.quick-actions.quick-actions-primary:after {
  border-bottom-color: #1572e8 !important
}

.quick-actions.quick-actions-primary .quick-actions-header {
  background: #1572e8
}

.quick-actions.quick-actions-primary .quick-actions-item {
  color: #1572e8
}

.quick-actions.quick-actions-secondary:after {
  border-bottom-color: #6861ce !important
}

.quick-actions.quick-actions-secondary .quick-actions-header {
  background: #6861ce
}

.quick-actions.quick-actions-secondary .quick-actions-item {
  color: #6861ce
}

.quick-actions.quick-actions-info:after {
  border-bottom-color: #48abf7 !important
}

.quick-actions.quick-actions-info .quick-actions-header {
  background: #48abf7
}

.quick-actions.quick-actions-info .quick-actions-item {
  color: #48abf7
}

.quick-actions.quick-actions-warning:after {
  border-bottom-color: #ffad46 !important
}

.quick-actions.quick-actions-warning .quick-actions-header {
  background: #ffad46
}

.quick-actions.quick-actions-warning .quick-actions-item {
  color: #ffad46
}

.quick-actions.quick-actions-success:after {
  border-bottom-color: #31ce36 !important
}

.quick-actions.quick-actions-success .quick-actions-header {
  background: #31ce36
}

.quick-actions.quick-actions-success .quick-actions-item {
  color: #31ce36
}

.quick-actions.quick-actions-danger:after {
  border-bottom-color: #f25961 !important
}

.quick-actions.quick-actions-danger .quick-actions-header {
  background: #f25961
}

.quick-actions.quick-actions-danger .quick-actions-item {
  color: #f25961
}

@media screen and (max-width:991px) {

  .messages-notif-box .message-notif-scroll,
  .notif-box .notif-scroll,
  .quick-actions .quick-actions-scroll {
    max-height: calc(100vh - 200px)
  }

  .dropdown-user .dropdown-user-scroll {
    max-height: calc(100vh - 132px)
  }
}

@media screen and (min-width:991px) {
  .navbar-header .dropdown-menu {
    margin-top: 13px
  }

  .navbar-header .dropdown-menu:after {
    border-bottom: 8px solid #fff;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    content: "";
    right: 10px;
    top: -8px;
    position: absolute;
    z-index: 1001
  }
}

.chart-circle {
  display: flex;
  justify-content: center
}

.chart-circle .circles-text {
  font-size: 25px !important
}

.chart-container {
  min-height: 300px;
  position: relative
}

.html-legend {
  list-style: none;
  cursor: pointer;
  padding-left: 0;
  text-align: center;
  margin-top: 1rem
}

.html-legend li {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  margin-right: 5px;
  margin-bottom: 6px;
  color: #8d9498;
  font-size: 12px
}

.html-legend li.hidden {
  text-decoration: line-through
}

.html-legend li span {
  border-radius: 15px;
  display: inline-block;
  height: 15px;
  margin-right: 10px;
  width: 15px;
  vertical-align: top
}

.jqstooltip {
  box-sizing: content-box
}

.alert {
  border: 0;
  position: relative;
  padding: .95rem 1.25rem;
  border-radius: 1px;
  color: inherit;
  background-color: #fff;
  -webkit-box-shadow: 1px 1px 14px 0 rgba(18, 38, 63, .26);
  -moz-box-shadow: 1px 1px 14px 0 rgba(18, 38, 63, .26);
  box-shadow: 1px 1px 14px 0 rgba(18, 38, 63, .26)
}

.alert [data-notify=icon] {
  display: block
}

.alert [data-notify=icon]::before {
  line-height: 35px;
  font-size: 22px;
  display: block;
  left: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border-radius: 30px;
  text-align: center;
  color: #fff
}

.alert [data-notify=title] {
  display: block;
  color: #2b2b2b;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 5px
}

.alert [data-notify=message] {
  font-size: 13px;
  color: #908e8e
}

.alert .close {
  background: rgba(255, 255, 255, .8);
  width: 25px;
  height: 25px;
  line-height: 25px;
  top: 12px !important;
  border-radius: 50%
}

.alert-default {
  border-left: 4px solid #1a2035
}

.alert-default [data-notify=icon]:before {
  background: #1a2035
}

.alert-primary {
  border-left: 4px solid #1572e8
}

.alert-primary [data-notify=icon]:before {
  background: #1572e8
}

.alert-secondary {
  border-left: 4px solid #6861ce
}

.alert-secondary [data-notify=icon]:before {
  background: #6861ce
}

.alert-info {
  border-left: 4px solid #48abf7
}

.alert-info [data-notify=icon]:before {
  background: #48abf7
}

.alert-success {
  border-left: 4px solid #31ce36
}

.alert-success [data-notify=icon]:before {
  background: #31ce36
}

.alert-warning {
  border-left: 4px solid #ffad46
}

.alert-warning [data-notify=icon]:before {
  background: #ffad46
}

.alert-danger {
  border-left: 4px solid #f25961
}

.alert-danger [data-notify=icon]:before {
  background: #f25961
}

.btn {
  padding: .65rem 1.4rem;
  font-size: 14px;
  opacity: 1;
  border-radius: 3px
}

.btn:focus,
.btn:hover {
  opacity: .9;
  transition: all .3s
}

.btn .btn-label {
  display: inline-block
}

.btn .btn-label i {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 2px;
  margin-left: -2px;
  line-height: 0;
  margin-top: -2.5px
}

.btn .btn-label.just-icon i {
  margin-left: 0 !important;
  margin-right: 0 !important
}

.btn-lg {
  font-size: 15px;
  border-radius: 3px;
  padding: 12.5px 27.5px;
  font-weight: 400
}

.btn-lg .btn-label i {
  font-size: 27px;
  vertical-align: middle;
  margin-right: 2px;
  margin-left: -7px;
  line-height: 0;
  margin-top: -2.5px
}

.btn-lg .btn-label.just-icon i {
  margin-left: 0 !important;
  margin-right: 0 !important
}

.btn-sm {
  font-size: 11px;
  padding: 7px 13px
}

.btn-xs {
  font-size: 10px;
  padding: 5px 9px
}

.btn.disabled:hover,
.btn:hover:disabled {
  opacity: .65
}

.btn-icon {
  font-size: .9375rem;
  height: 2.5125rem;
  line-height: normal;
  min-width: 2.5125rem;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 2.5125rem
}

.btn-icon.btn-lg {
  height: 2.75rem;
  min-width: 2.75rem;
  width: 2.75rem
}

.btn-icon.btn-sm {
  height: 2rem;
  min-width: 2rem;
  width: 2rem
}

.btn-icon.btn-xs {
  height: 1.6875rem;
  min-width: 1.6875rem;
  width: 1.6875rem
}

.btn-white {
  background: #fff !important;
  color: #1a2035 !important
}

.btn-white:disabled,
.btn-white:focus,
.btn-white:hover {
  background: #fff !important;
  color: #1a2035 !important
}

.btn-default {
  background: #1a2035 !important;
  color: #fff !important
}

.btn-default:disabled,
.btn-default:focus,
.btn-default:hover {
  background: #1a2035 !important;
  color: #fff !important
}

.btn-primary {
  background: #1572e8 !important;
  border-color: #1572e8 !important
}

.btn-primary:disabled,
.btn-primary:focus,
.btn-primary:hover {
  background: #1572e8 !important;
  border-color: #1572e8 !important
}

.btn-secondary {
  background: #6861ce !important;
  border-color: #6861ce !important
}

.btn-secondary:disabled,
.btn-secondary:focus,
.btn-secondary:hover {
  background: #6861ce !important;
  border-color: #6861ce !important
}

.btn-info {
  background: #48abf7 !important;
  border-color: #48abf7 !important
}

.btn-info:disabled,
.btn-info:focus,
.btn-info:hover {
  background: #48abf7 !important;
  border-color: #48abf7 !important
}

.btn-success {
  background: #31ce36 !important;
  border-color: #31ce36 !important
}

.btn-success:disabled,
.btn-success:focus,
.btn-success:hover {
  background: #31ce36 !important;
  border-color: #31ce36 !important
}

.btn-warning {
  background: #ffad46 !important;
  border-color: #ffad46 !important;
  color: #fff !important
}

.btn-warning:disabled,
.btn-warning:focus,
.btn-warning:hover {
  background: #ffad46 !important;
  border-color: #ffad46 !important;
  color: #fff !important
}

.btn-danger {
  background: #f25961 !important;
  border-color: #f25961 !important
}

.btn-danger:disabled,
.btn-danger:focus,
.btn-danger:hover {
  background: #f25961 !important;
  border-color: #f25961 !important
}

.btn-light {
  background: #fff !important;
  border-color: transparent
}

.btn-light:disabled,
.btn-light:focus,
.btn-light:hover {
  background: #ebecec !important;
  border-color: transparent
}

.btn-dropdown-card-header {
  padding: 0;
  background: 0 0;
  color: inherit;
  font-size: 15px
}

.btn-dropdown-card-header:after {
  display: none
}

.btn-border {
  background: 0 0 !important
}

.btn-border:focus,
.btn-border:hover {
  background: 0 0 !important
}

.btn-border.btn-white {
  color: #fff !important;
  border: 1px solid #fff !important
}

.btn-border.btn-default {
  color: #1a2035 !important;
  border: 1px solid #1a2035 !important
}

.btn-border.btn-primary {
  color: #1572e8 !important;
  border: 1px solid #1572e8 !important
}

.btn-border.btn-secondary {
  color: #6861ce !important;
  border: 1px solid #6861ce !important
}

.btn-border.btn-info {
  color: #48abf7 !important;
  border: 1px solid #48abf7 !important
}

.btn-border.btn-success {
  color: #31ce36 !important;
  border: 1px solid #31ce36 !important
}

.btn-border.btn-warning {
  color: #ffad46 !important;
  border: 1px solid #ffad46 !important
}

.btn-border.btn-danger {
  color: #f25961 !important;
  border: 1px solid #f25961 !important
}

.btn-border.btn-light {
  border: 1px solid #efefef;
  background: #fff !important
}

.btn-round {
  border-radius: 100px !important
}

.btn-link {
  border: 0 !important;
  background: 0 0 !important
}

.btn-link:focus,
.btn-link:hover {
  text-decoration: underline !important;
  background: 0 0 !important;
  border: 0 !important
}

.btn-link.btn-default {
  color: #1a2035 !important
}

.btn-link.btn-default:hover {
  color: #1a2035 !important
}

.btn-link.btn-primary {
  color: #1572e8 !important
}

.btn-link.btn-primary:hover {
  color: #1572e8 !important
}

.btn-link.btn-secondary {
  color: #6861ce !important
}

.btn-link.btn-secondary:hover {
  color: #6861ce !important
}

.btn-link.btn-info {
  color: #48abf7 !important
}

.btn-link.btn-info:hover {
  color: #48abf7 !important
}

.btn-link.btn-success {
  color: #31ce36 !important
}

.btn-link.btn-success:hover {
  color: #31ce36 !important
}

.btn-link.btn-warning {
  color: #ffad46 !important
}

.btn-link.btn-warning:hover {
  color: #ffad46 !important
}

.btn-link.btn-danger {
  color: #f25961 !important
}

.btn-link.btn-danger:hover {
  color: #f25961 !important
}

.toggle-on.btn {
  color: #fff !important
}

.toggle-handle {
  background: #fff !important
}

.toggle-handle:hover {
  background: #fff !important
}

.btn-round .toggle-handle {
  border-radius: 50px
}

.btn-rounded {
  border-radius: 60px !important
}

.btn-full {
  width: 100%
}

.btn-no-radius {
  border-radius: 0
}

.nav-pills>li:first-child>.nav-link {
  border-radius: 4px 0 0 4px !important
}

.nav-pills>li:last-child>.nav-link {
  border-radius: 0 4px 4px 0 !important
}

.nav-link.disabled {
  color: #6c757d !important
}

.nav-pills .nav-link {
  padding: 10px 20px
}

.nav-pills>li>.nav-link {
  margin-left: -1px;
  border-radius: 0 !important;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #1572e8;
  color: #585c5d
}

.nav-pills>li>.nav-link.active {
  background: #1572e8
}

.nav-pills>li>.nav-link:hover {
  background: rgba(222, 222, 222, .4)
}

.nav-pills.nav-pills-no-bd li {
  margin-left: 15px !important
}

.nav-pills.nav-pills-no-bd li .nav-link {
  border: 0 !important;
  border-radius: 50px !important;
  background: rgba(222, 222, 222, .4)
}

.nav-pills.nav-pills-no-bd li .nav-link.active {
  border-radius: 50px !important
}

.nav-pills.nav-pills-no-bd li:first-child {
  margin-left: 0 !important
}

.nav-pills.nav-pills-no-bd.nav-pills-icons .nav-link,
.nav-pills.nav-pills-no-bd.nav-pills-icons .nav-link.active {
  border-radius: 5px !important
}

.nav-pills.flex-column .nav-link {
  border-radius: 0 !important;
  border: 1px solid #1572e8;
  color: #585c5d;
  margin-top: -1px;
  text-align: center;
  word-wrap: normal;
  padding: 10px 0
}

.nav-pills.flex-column .nav-link:hover {
  background: rgba(222, 222, 222, .4)
}

.nav-pills.flex-column .nav-link.active {
  background: #1572e8
}

.nav-pills.flex-column .nav-link:first-child {
  border-radius: 4px 4px 0 0 !important
}

.nav-pills.flex-column .nav-link:last-child {
  border-radius: 0 0 4px 4px !important
}

.nav-pills.flex-column.nav-pills-no-bd .nav-link {
  border: 0 !important;
  border-radius: 50px !important;
  background: rgba(222, 222, 222, .4);
  margin-top: 5px;
  margin-bottom: 5px
}

.nav-pills.flex-column.nav-pills-no-bd .nav-link.active {
  border-radius: 50px !important
}

.nav-pills.flex-column.nav-pills-icons .nav-link,
.nav-pills.flex-column.nav-pills-icons .nav-link.active {
  border-radius: 5px !important
}

.nav-pills.nav-pills-icons .nav-link,
.nav-pills.nav-pills-icons .nav-link.active {
  border-radius: 5px !important;
  padding-top: 12px;
  padding-bottom: 12px
}

.nav-pills.nav-pills-icons i {
  display: block;
  text-align: center;
  font-size: 2em;
  line-height: 50px
}

.nav-pills.nav-danger .nav-link,
.nav-pills.nav-default .nav-link,
.nav-pills.nav-info .nav-link,
.nav-pills.nav-primary .nav-link,
.nav-pills.nav-secondary .nav-link,
.nav-pills.nav-success .nav-link,
.nav-pills.nav-warning .nav-link {
  border: 1px solid #eee
}

.nav-pills.nav-danger .nav-link.active,
.nav-pills.nav-default .nav-link.active,
.nav-pills.nav-info .nav-link.active,
.nav-pills.nav-primary .nav-link.active,
.nav-pills.nav-secondary .nav-link.active,
.nav-pills.nav-success .nav-link.active,
.nav-pills.nav-warning .nav-link.active {
  color: #fff !important
}

.nav-pills.nav-default .nav-link.active {
  background: #1a2035;
  border: 1px solid #1a2035
}

.nav-pills.nav-primary .nav-link.active {
  background: #1572e8;
  border: 1px solid #1572e8
}

.nav-pills.nav-secondary .nav-link.active {
  background: #6861ce;
  border: 1px solid #6861ce
}

.nav-pills.nav-info .nav-link.active {
  background: #48abf7;
  border: 1px solid #48abf7
}

.nav-pills.nav-success .nav-link.active {
  background: #31ce36;
  border: 1px solid #31ce36
}

.nav-pills.nav-warning .nav-link.active {
  background: #ffad46;
  border: 1px solid #ffad46
}

.nav-pills.nav-danger .nav-link.active {
  background: #f25961;
  border: 1px solid #f25961
}

.nav-sm .nav-link {
  font-size: 11px !important;
  padding: 8px 16px !important
}

.popover {
  max-width: 240px;
  line-height: 1.7;
  border: 0;
  box-shadow: 0 0 20px 1px rgba(69, 65, 78, .2)
}

.popover .popover-header {
  background: 0 0;
  font-size: 14px;
  border-bottom: 0;
  text-transform: capitalize;
  margin-top: 5px;
  color: #aaa;
  font-weight: 400
}

.popover .popover-body {
  margin-bottom: 5px
}

.popover .popover-body p {
  font-size: 13px;
  margin-bottom: 1rem
}

.popover.bs-popover-bottom .arrow:before,
.popover.bs-popover-left .arrow:before,
.popover.bs-popover-right .arrow:before,
.popover.bs-popover-top .arrow:before {
  border: transparent
}

.popover.bs-popover-auto[x-placement^=right],
.popover.bs-popover-right {
  margin-left: 10px
}

.popover.bs-popover-auto[x-placement^=left],
.popover.bs-popover-left {
  margin-right: 10px
}

.popover.bs-popover-auto[x-placement^=top],
.popover.bs-popover-top {
  margin-bottom: 10px
}

.popover.bs-popover-auto[x-placement^=bottom],
.popover.bs-popover-bottom {
  margin-top: 10px
}

.progress {
  border-radius: 100px;
  height: 14px
}

.progress .progress-bar {
  border-radius: 100px
}

.progress.progress-sm {
  height: 8px
}

.progress.progress-lg {
  height: 20px
}

.pagination>li:first-child>a,
.pagination>li:first-child>span,
.pagination>li:last-child>a,
.pagination>li:last-child>span,
.pagination>li>a,
.pagination>li>span {
  border-radius: 100px !important;
  margin: 0 2px;
  color: #777;
  border-color: #ddd
}

.pagination.pg-default>li.active:first-child>a,
.pagination.pg-default>li.active:first-child>span,
.pagination.pg-default>li.active:last-child>a,
.pagination.pg-default>li.active:last-child>span,
.pagination.pg-default>li.active>a,
.pagination.pg-default>li.active>span {
  background: #1a2035;
  border-color: #1a2035;
  color: #fff
}

.pagination.pg-primary>li.active:first-child>a,
.pagination.pg-primary>li.active:first-child>span,
.pagination.pg-primary>li.active:last-child>a,
.pagination.pg-primary>li.active:last-child>span,
.pagination.pg-primary>li.active>a,
.pagination.pg-primary>li.active>span {
  background: #1572e8;
  border-color: #1572e8;
  color: #fff
}

.pagination.pg-secondary>li.active:first-child>a,
.pagination.pg-secondary>li.active:first-child>span,
.pagination.pg-secondary>li.active:last-child>a,
.pagination.pg-secondary>li.active:last-child>span,
.pagination.pg-secondary>li.active>a,
.pagination.pg-secondary>li.active>span {
  background: #6861ce;
  border-color: #6861ce;
  color: #fff
}

.pagination.pg-info>li.active:first-child>a,
.pagination.pg-info>li.active:first-child>span,
.pagination.pg-info>li.active:last-child>a,
.pagination.pg-info>li.active:last-child>span,
.pagination.pg-info>li.active>a,
.pagination.pg-info>li.active>span {
  background: #48abf7;
  border-color: #48abf7;
  color: #fff
}

.pagination.pg-success>li.active:first-child>a,
.pagination.pg-success>li.active:first-child>span,
.pagination.pg-success>li.active:last-child>a,
.pagination.pg-success>li.active:last-child>span,
.pagination.pg-success>li.active>a,
.pagination.pg-success>li.active>span {
  background: #31ce36;
  border-color: #31ce36;
  color: #fff
}

.pagination.pg-warning>li.active:first-child>a,
.pagination.pg-warning>li.active:first-child>span,
.pagination.pg-warning>li.active:last-child>a,
.pagination.pg-warning>li.active:last-child>span,
.pagination.pg-warning>li.active>a,
.pagination.pg-warning>li.active>span {
  background: #ffad46;
  border-color: #ffad46;
  color: #fff
}

.pagination.pg-danger>li.active:first-child>a,
.pagination.pg-danger>li.active:first-child>span,
.pagination.pg-danger>li.active:last-child>a,
.pagination.pg-danger>li.active:last-child>span,
.pagination.pg-danger>li.active>a,
.pagination.pg-danger>li.active>span {
  background: #f25961;
  border-color: #f25961;
  color: #fff
}

.slider-default .ui-slider-range {
  background: #1a2035
}

.slider-primary .ui-slider-range {
  background: #1572e8
}

.slider-secondary .ui-slider-range {
  background: #6861ce
}

.slider-info .ui-slider-range {
  background: #48abf7
}

.slider-success .ui-slider-range {
  background: #31ce36
}

.slider-warning .ui-slider-range {
  background: #ffad46
}

.slider-danger .ui-slider-range {
  background: #f25961
}

.modal .bg-danger .modal-title,
.modal .bg-default .modal-title,
.modal .bg-info .modal-title,
.modal .bg-primary .modal-title,
.modal .bg-secondary .modal-title,
.modal .bg-success .modal-title,
.modal .bg-warning .modal-title {
  color: #fff !important
}

.modal-content {
  border-radius: .4rem !important;
  border: 0 !important
}

.activity-feed {
  padding: 15px;
  list-style: none
}

.activity-feed .feed-item {
  position: relative;
  padding-bottom: 20px;
  padding-left: 30px;
  border-left: 2px solid #e4e8eb
}

.activity-feed .feed-item:last-child {
  border-color: transparent
}

.activity-feed .feed-item::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: -7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #177dff
}

.feed-item-default::after {
  background: #1a2035 !important
}

.feed-item-primary::after {
  background: #1572e8 !important
}

.feed-item-secondary::after {
  background: #6861ce !important
}

.feed-item-success::after {
  background: #31ce36 !important
}

.feed-item-danger::after {
  background: #f25961 !important
}

.feed-item-info::after {
  background: #48abf7 !important
}

.feed-item-warning::after {
  background: #ffad46 !important
}

.activity-feed .feed-item .date {
  display: block;
  position: relative;
  top: -5px;
  color: #8c96a3;
  text-transform: uppercase;
  font-size: 13px
}

.activity-feed .feed-item .text {
  position: relative;
  top: -3px
}

.timeline {
  list-style: none;
  padding: 20px 0 20px;
  position: relative
}

.timeline:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #eee;
  left: 50%;
  margin-left: -1.5px
}

.timeline>li {
  margin-bottom: 20px;
  position: relative
}

.timeline>li:before {
  content: " ";
  display: table
}

.timeline>li:after {
  content: " ";
  display: table;
  clear: both
}

.timeline>li:before {
  content: " ";
  display: table
}

.timeline>li:after {
  content: " ";
  display: table;
  clear: both
}

.timeline>li>.timeline-panel {
  width: 50%;
  float: left;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 3px;
  padding: 20px;
  position: relative;
  -webkit-box-shadow: 0 1px 20px 1px rgba(69, 65, 78, .06);
  -moz-box-shadow: 0 1px 20px 1px rgba(69, 65, 78, .06);
  box-shadow: 0 1px 20px 1px rgba(69, 65, 78, .06)
}

.timeline>li.timeline-inverted+li:not(.timeline-inverted) {
  margin-top: -60px
}

.timeline>li:not(.timeline-inverted) {
  padding-right: 90px
}

.timeline>li:not(.timeline-inverted)+li.timeline-inverted {
  margin-top: -60px
}

.timeline>li.timeline-inverted {
  padding-left: 90px
}

.timeline>li.timeline-inverted>.timeline-panel {
  float: right
}

.timeline>li.timeline-inverted>.timeline-panel:before {
  border-left-width: 0;
  border-right-width: 15px;
  left: -15px;
  right: auto
}

.timeline>li.timeline-inverted>.timeline-panel:after {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto
}

.timeline>li>.timeline-panel:before {
  position: absolute;
  top: 26px;
  right: -15px;
  display: inline-block;
  border-top: 15px solid transparent;
  border-left: 15px solid #eee;
  border-right: 0 solid #eee;
  border-bottom: 15px solid transparent;
  content: " "
}

.timeline>li>.timeline-panel:after {
  position: absolute;
  top: 27px;
  right: -14px;
  display: inline-block;
  border-top: 14px solid transparent;
  border-left: 14px solid #fff;
  border-right: 0 solid #fff;
  border-bottom: 14px solid transparent;
  content: " "
}

.timeline>li>.timeline-badge {
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.8em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -25px;
  background-color: #999;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%
}

.timeline-badge.default {
  background-color: #1a2035 !important
}

.timeline-badge.primary {
  background-color: #1572e8 !important
}

.timeline-badge.secondary {
  background-color: #6861ce !important
}

.timeline-badge.success {
  background-color: #31ce36 !important
}

.timeline-badge.warning {
  background-color: #ffad46 !important
}

.timeline-badge.danger {
  background-color: #f25961 !important
}

.timeline-badge.info {
  background-color: #48abf7 !important
}

.timeline-title {
  font-size: 17px;
  margin-top: 0;
  color: inherit;
  font-weight: 400
}

.timeline-heading i {
  font-size: 22px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px
}

.timeline-body>p,
.timeline-body>ul {
  margin-bottom: 0
}

.timeline-body>p+p {
  margin-top: 5px
}

.full-screen-maps {
  height: 100vh !important
}

.vmap {
  width: 100%;
  min-height: 265px
}

.vmap>svg {
  margin: auto;
  display: flex
}

.vmap>svg>g {
  transition: all ease-in-out .2s
}

.jqvmap-label,
.jqvmap-pin {
  pointer-events: none
}

.jqvmap-label {
  position: absolute;
  display: none;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #292929;
  color: #fff;
  font-size: smaller;
  padding: 3px
}

.jqvmap-zoomin,
.jqvmap-zoomout {
  position: absolute;
  left: 10px;
  border-radius: 13px;
  background: #35cd3a;
  padding: 6px 7px;
  color: #fff;
  cursor: pointer;
  line-height: 10px;
  text-align: center;
  font-size: 14px
}

.jqvmap-zoomin {
  top: 15px
}

.jqvmap-zoomout {
  top: 45px
}

.jqvmap-region {
  cursor: pointer
}

.jqvmap-ajax_response {
  width: 100%;
  height: 500px
}

.list-group .list-group-header {
  font-size: 12px;
  font-weight: 600;
  padding: .75rem 1rem
}

.list-group .list-group-item {
  display: flex;
  align-items: stretch;
  border-width: 1px 0;
  border-color: #ebecec
}

.list-group .list-group-item-figure {
  align-self: start;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  color: #a9acb0
}

.list-group .list-group-item-body {
  flex: 1;
  min-width: 0;
  align-self: center;
  font-size: .875rem
}

.list-group .list-group-item-text {
  margin-bottom: 0;
  line-height: 1.25rem;
  color: #686f76
}

.list-group-file-item .list-group-item {
  padding: 0
}

.list-group-file-item .list-group-item-figure {
  padding: .75rem 1rem
}

.list-group-file-item .list-group-item-body {
  padding: .75rem 0
}

.list-group-bordered .list-group-item {
  border: 1px solid #e3ebf6
}

.list-group-bordered .list-group-item.active {
  background: #1572e8;
  border-color: #1572e8
}

.list-group-lg .list-group-item {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem
}

.selectgroup {
  display: -ms-inline-flexbox;
  display: inline-flex
}

.selectgroup-item {
  -ms-flex-positive: 1;
  flex-grow: 1;
  position: relative;
  font-weight: 400 !important
}

.selectgroup-item+.selectgroup-item {
  margin-left: -1px
}

.selectgroup-item:not(:first-child) .selectgroup-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0
}

.selectgroup-item:not(:last-child) .selectgroup-button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0
}

.selectgroup-input {
  opacity: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0
}

.selectgroup-button {
  display: block;
  border: 1px solid rgba(0, 40, 100, .12);
  text-align: center;
  padding: .375rem 1rem;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  color: #9aa0ac;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  line-height: 1.5rem;
  min-width: 2.375rem
}

.selectgroup-button-icon {
  padding-left: .5rem;
  padding-right: .5rem;
  font-size: 1rem
}

.selectgroup-input:checked+.selectgroup-button {
  border-color: #1572e8;
  z-index: 1;
  color: #1572e8;
  background: rgba(21, 114, 232, .15)
}

.selectgroup-input:focus+.selectgroup-button {
  border-color: #1572e8;
  z-index: 2;
  color: #1572e8;
  box-shadow: 0 0 0 2px rgba(21, 114, 232, .25)
}

.selectgroup-pills {
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: start;
  align-items: flex-start
}

.selectgroup-pills .selectgroup-item {
  margin-right: .5rem;
  -ms-flex-positive: 0;
  flex-grow: 0
}

.selectgroup-pills .selectgroup-button {
  border-radius: 50px !important
}

.selectgroup.selectgroup-primary .selectgroup-input:checked+.selectgroup-button {
  border-color: #1572e8;
  color: #1572e8;
  background: rgba(21, 114, 232, .15)
}

.selectgroup.selectgroup-primary .selectgroup-input:focus+.selectgroup-button {
  border-color: #1572e8;
  color: #1572e8;
  box-shadow: 0 0 0 2px rgba(21, 114, 232, .25)
}

.selectgroup.selectgroup-secondary .selectgroup-input:checked+.selectgroup-button {
  border-color: #6861ce;
  color: #6861ce;
  background: rgba(104, 97, 206, .15)
}

.selectgroup.selectgroup-secondary .selectgroup-input:focus+.selectgroup-button {
  border-color: #6861ce;
  color: #6861ce;
  box-shadow: 0 0 0 2px rgba(104, 97, 206, .25)
}

.selectgroup.selectgroup-info .selectgroup-input:checked+.selectgroup-button {
  border-color: #48abf7;
  color: #48abf7;
  background: rgba(72, 171, 247, .15)
}

.selectgroup.selectgroup-info .selectgroup-input:focus+.selectgroup-button {
  border-color: #48abf7;
  color: #48abf7;
  box-shadow: 0 0 0 2px rgba(72, 171, 247, .25)
}

.selectgroup.selectgroup-success .selectgroup-input:checked+.selectgroup-button {
  border-color: #31ce36;
  color: #31ce36;
  background: rgba(49, 206, 54, .15)
}

.selectgroup.selectgroup-success .selectgroup-input:focus+.selectgroup-button {
  border-color: #31ce36;
  color: #31ce36;
  box-shadow: 0 0 0 2px rgba(49, 206, 54, .25)
}

.selectgroup.selectgroup-warning .selectgroup-input:checked+.selectgroup-button {
  border-color: #ffad46;
  color: #ffad46;
  background: rgba(255, 173, 70, .15)
}

.selectgroup.selectgroup-warning .selectgroup-input:focus+.selectgroup-button {
  border-color: #ffad46;
  color: #ffad46;
  box-shadow: 0 0 0 2px rgba(255, 173, 70, .25)
}

.selectgroup.selectgroup-danger .selectgroup-input:checked+.selectgroup-button {
  border-color: #f25961;
  color: #f25961;
  background: rgba(242, 89, 97, .15)
}

.selectgroup.selectgroup-danger .selectgroup-input:focus+.selectgroup-button {
  border-color: #f25961;
  color: #f25961;
  box-shadow: 0 0 0 2px rgba(242, 89, 97, .25)
}

.colorinput {
  margin: 0;
  position: relative;
  cursor: pointer
}

.colorinput-input {
  position: absolute;
  z-index: -1;
  opacity: 0
}

.colorinput-color {
  display: inline-block;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 40, 100, .12);
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
}

.colorinput-color:before {
  content: '';
  opacity: 0;
  position: absolute;
  top: .25rem;
  left: .25rem;
  height: 1.25rem;
  width: 1.25rem;
  transition: .3s opacity;
  background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E") no-repeat center center/50% 50%
}

.colorinput-input:checked~.colorinput-color:before {
  opacity: 1
}

.colorinput-input:focus~.colorinput-color {
  border-color: #467fcf;
  box-shadow: 0 0 0 2px rgba(70, 127, 207, .25)
}

.imagecheck {
  margin: 0;
  position: relative;
  cursor: pointer
}

.imagecheck-input {
  position: absolute;
  z-index: -1;
  opacity: 0
}

.imagecheck-figure {
  border: 1px solid rgba(0, 40, 100, .12);
  border-radius: 3px;
  margin: 0;
  position: relative
}

.imagecheck-input:focus~.imagecheck-figure {
  border-color: #1572e8;
  box-shadow: 0 0 0 2px rgba(70, 127, 207, .25)
}

.imagecheck-input:checked~.imagecheck-figure {
  border-color: rgba(0, 40, 100, .24)
}

.imagecheck-figure:before {
  content: '';
  position: absolute;
  top: .25rem;
  left: .25rem;
  display: block;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #1572e8 url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E") no-repeat center center/50% 50%;
  color: #fff;
  z-index: 1;
  border-radius: 3px;
  opacity: 0;
  transition: .3s opacity
}

.imagecheck-input:checked~.imagecheck-figure:before {
  opacity: 1
}

.imagecheck-image {
  max-width: 100%;
  opacity: .64;
  transition: .3s opacity
}

.imagecheck-image:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px
}

.imagecheck-image:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px
}

.imagecheck:hover .imagecheck-image {
  opacity: 1
}

.imagecheck-input:checked~.imagecheck-figure .imagecheck-image,
.imagecheck-input:focus~.imagecheck-figure .imagecheck-image {
  opacity: 1
}

.imagecheck-caption {
  text-align: center;
  padding: .25rem .25rem;
  color: #9aa0ac;
  font-size: .875rem;
  transition: .3s color
}

.imagecheck:hover .imagecheck-caption {
  color: #495057
}

.imagecheck-input:checked~.imagecheck-figure .imagecheck-caption,
.imagecheck-input:focus~.imagecheck-figure .imagecheck-caption {
  color: #495057
}

.is-loading:after,
.loader {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background: 0 0;
  border: 3px solid #6861ce;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite
}

.is-loading-lg:after,
.loader-lg {
  width: 2rem;
  height: 2rem;
  border-width: 5px
}

.is-loading-sm:after,
.loader-sm {
  width: 1rem;
  height: 1rem;
  border-width: 2px
}

.is-loading {
  position: relative;
  color: transparent !important
}

.is-loading>* {
  opacity: .2 !important
}

.is-loading:after {
  position: absolute;
  top: calc(50% - 1.5rem/2);
  left: calc(50% - 1.5rem/2);
  content: ''
}

.is-loading-lg:after {
  top: calc(50% - 2rem/2);
  left: calc(50% - 2rem/2)
}

.is-loading-sm:after {
  top: calc(50% - 1rem/2);
  left: calc(50% - 1rem/2)
}

.btn-danger.is-loading:after,
.btn-default.is-loading:after,
.btn-info.is-loading:after,
.btn-primary.is-loading:after,
.btn-secondary.is-loading:after,
.btn-success.is-loading:after,
.btn-warning.is-loading:after,
.card-danger.is-loading:after,
.card-default.is-loading:after,
.card-info.is-loading:after,
.card-primary.is-loading:after,
.card-secondary.is-loading:after,
.card-success.is-loading:after,
.card-warning.is-loading:after,
.is-loading-danger:after,
.is-loading-default:after,
.is-loading-info:after,
.is-loading-primary:after,
.is-loading-secondary:after,
.is-loading-success:after,
.is-loading-warning:after,
.loader-danger,
.loader-default,
.loader-info,
.loader-primary,
.loader-secondary,
.loader-success,
.loader-warning {
  border-bottom-color: transparent !important
}

.btn-danger.is-loading:after,
.btn-default.is-loading:after,
.btn-info.is-loading:after,
.btn-primary.is-loading:after,
.btn-secondary.is-loading:after,
.btn-success.is-loading:after,
.btn-warning.is-loading:after,
.card-danger.is-loading:after,
.card-default.is-loading:after,
.card-info.is-loading:after,
.card-primary.is-loading:after,
.card-secondary.is-loading:after,
.card-success.is-loading:after,
.card-warning.is-loading:after {
  border-color: #fff
}

.is-loading-default:after,
.loader-default {
  border-color: #1a2035
}

.is-loading-primary:after,
.loader-primary {
  border-color: #1572e8
}

.is-loading-secondary:after,
.loader-secondary {
  border-color: #6861ce
}

.is-loading-info:after,
.loader-info {
  border-color: #48abf7
}

.is-loading-success:after,
.loader-success {
  border-color: #31ce36
}

.is-loading-warning:after,
.loader-warning {
  border-color: #ffad46
}

.is-loading-danger:after,
.loader-danger {
  border-color: #f25961
}

@keyframes spin {
  from {
    transform: rotate(0)
  }

  to {
    transform: rotate(360deg)
  }
}

.ui-draggable-handle {
  -ms-touch-action: none;
  touch-action: none
}

.ui-helper-hidden {
  display: none
}

.ui-helper-hidden-accessible {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px
}

.ui-helper-reset {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  line-height: 1.3;
  text-decoration: none;
  font-size: 100%;
  list-style: none
}

.ui-helper-clearfix:after,
.ui-helper-clearfix:before {
  content: "";
  display: table;
  border-collapse: collapse
}

.ui-helper-clearfix:after {
  clear: both
}

.ui-helper-zfix {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  filter: Alpha(Opacity=0)
}

.ui-front {
  z-index: 100
}

.ui-state-disabled {
  cursor: default !important;
  pointer-events: none
}

.ui-icon {
  display: inline-block;
  vertical-align: middle;
  margin-top: -.25em;
  position: relative;
  text-indent: -99999px;
  overflow: hidden;
  background-repeat: no-repeat
}

.ui-widget-icon-block {
  left: 50%;
  margin-left: -8px;
  display: block
}

.ui-widget-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%
}

.ui-resizable {
  position: relative
}

.ui-resizable-handle {
  position: absolute;
  font-size: .1px;
  display: block;
  -ms-touch-action: none;
  touch-action: none
}

.ui-resizable-autohide .ui-resizable-handle,
.ui-resizable-disabled .ui-resizable-handle {
  display: none
}

.ui-resizable-n {
  cursor: n-resize;
  height: 7px;
  width: 100%;
  top: -5px;
  left: 0
}

.ui-resizable-s {
  cursor: s-resize;
  height: 7px;
  width: 100%;
  bottom: -5px;
  left: 0
}

.ui-resizable-e {
  cursor: e-resize;
  width: 7px;
  right: -5px;
  top: 0;
  height: 100%
}

.ui-resizable-w {
  cursor: w-resize;
  width: 7px;
  left: -5px;
  top: 0;
  height: 100%
}

.ui-resizable-se {
  cursor: se-resize;
  width: 12px;
  height: 12px;
  right: 1px;
  bottom: 1px
}

.ui-resizable-sw {
  cursor: sw-resize;
  width: 9px;
  height: 9px;
  left: -5px;
  bottom: -5px
}

.ui-resizable-nw {
  cursor: nw-resize;
  width: 9px;
  height: 9px;
  left: -5px;
  top: -5px
}

.ui-resizable-ne {
  cursor: ne-resize;
  width: 9px;
  height: 9px;
  right: -5px;
  top: -5px
}

.ui-selectable {
  -ms-touch-action: none;
  touch-action: none
}

.ui-selectable-helper {
  position: absolute;
  z-index: 100;
  border: 1px dotted #000
}

.ui-sortable-handle {
  -ms-touch-action: none;
  touch-action: none
}

.ui-slider {
  position: relative;
  text-align: left;
  background: #ddd
}

.ui-slider .ui-slider-handle {
  position: absolute;
  z-index: 2;
  width: 1em;
  height: 1em;
  cursor: default;
  -ms-touch-action: none;
  touch-action: none
}

.ui-slider .ui-slider-range {
  position: absolute;
  z-index: 1;
  font-size: .7em;
  display: block;
  border: 0;
  background-position: 0 0
}

.ui-slider.ui-state-disabled .ui-slider-handle,
.ui-slider.ui-state-disabled .ui-slider-range {
  filter: inherit
}

.ui-slider-horizontal {
  height: .4em
}

.ui-slider-horizontal .ui-slider-handle {
  top: -.4em;
  margin-left: -.6em
}

.ui-slider-horizontal .ui-slider-range {
  top: 0;
  height: 100%
}

.ui-slider-horizontal .ui-slider-range-min {
  left: 0
}

.ui-slider-horizontal .ui-slider-range-max {
  right: 0
}

.ui-slider-vertical {
  width: .8em;
  height: 100px
}

.ui-slider-vertical .ui-slider-handle {
  left: -.3em;
  margin-left: 0;
  margin-bottom: -.6em
}

.ui-slider-vertical .ui-slider-range {
  left: 0;
  width: 100%
}

.ui-slider-vertical .ui-slider-range-min {
  bottom: 0
}

.ui-slider-vertical .ui-slider-range-max {
  top: 0
}

.ui-slider-handle {
  background: #fff;
  background: -moz-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(100%, #f7f7f7));
  background: -webkit-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -o-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -ms-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: linear-gradient(to bottom, #fff 0, #f7f7f7 100%);
  border-radius: 50px;
  box-shadow: 0 1px 4px 0 #9191ab !important
}

.ui-slider-handle:focus {
  background: #fff;
  background: -moz-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(100%, #f7f7f7));
  background: -webkit-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -o-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: -ms-linear-gradient(top, #fff 0, #f7f7f7 100%);
  background: linear-gradient(to bottom, #fff 0, #f7f7f7 100%);
  border-radius: 50px;
  box-shadow: 0 1px 4px 0 #9191ab !important
}

.scroll-wrapper {
  overflow: hidden !important;
  padding: 0 !important;
  position: relative
}

.scroll-wrapper>.scroll-content {
  border: none !important;
  box-sizing: content-box !important;
  height: auto;
  left: 0;
  margin: 0;
  max-height: none;
  max-width: none !important;
  overflow: scroll !important;
  padding: 0;
  position: relative !important;
  top: 0;
  width: auto !important
}

.scroll-wrapper>.scroll-content::-webkit-scrollbar {
  height: 0;
  width: 0
}

.scroll-element {
  display: none;
  box-sizing: content-box
}

.scroll-element div {
  box-sizing: content-box
}

.scroll-element.scroll-x.scroll-scrollx_visible,
.scroll-element.scroll-y.scroll-scrolly_visible {
  display: block
}

.scroll-element .scroll-arrow,
.scroll-element .scroll-bar {
  cursor: default
}

.scroll-textarea {
  border: 1px solid #ccc;
  border-top-color: #999
}

.scroll-textarea>.scroll-content {
  overflow: hidden !important
}

.scroll-textarea>.scroll-content>textarea {
  border: none !important;
  box-sizing: border-box;
  height: 100% !important;
  margin: 0;
  max-height: none !important;
  max-width: none !important;
  overflow: scroll !important;
  outline: 0;
  padding: 2px;
  position: relative !important;
  top: 0;
  width: 100% !important
}

.scrollbar-inner>.scroll-element .scroll-element_outer,
.scrollbar-outer>.scroll-element .scroll-element_outer {
  overflow: hidden
}

.scroll-textarea>.scroll-content>textarea::-webkit-scrollbar {
  height: 0;
  width: 0
}

.scrollbar-inner>.scroll-element {
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10
}

.scrollbar-inner>.scroll-element div {
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-inner>.scroll-element.scroll-x {
  bottom: 2px;
  height: 7px;
  left: 0;
  width: 100%
}

.scrollbar-inner>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size,
.scrollbar-inner>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track {
  left: -12px
}

.scrollbar-inner>.scroll-element.scroll-y {
  height: 100%;
  right: 2px;
  top: 0;
  width: 7px
}

.scrollbar-inner>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size,
.scrollbar-inner>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track {
  top: -12px
}

.scrollbar-inner>.scroll-element .scroll-bar,
.scrollbar-inner>.scroll-element .scroll-element_outer,
.scrollbar-inner>.scroll-element .scroll-element_track {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px
}

.scrollbar-inner>.scroll-element .scroll-bar {
  opacity: .4
}

.scrollbar-inner>.scroll-element .scroll-element_track {
  opacity: .4;
  background-color: #e0e0e0
}

.scrollbar-inner>.scroll-element .scroll-bar {
  background-color: #c2c2c2
}

.scrollbar-inner>.scroll-element.scroll-draggable .scroll-bar,
.scrollbar-inner>.scroll-element:hover .scroll-bar {
  background-color: #919191
}

.scrollbar-outer>.scroll-element {
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  background-color: #fff
}

.scrollbar-outer>.scroll-element div {
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-outer>.scroll-element.scroll-x {
  bottom: 0;
  height: 12px;
  left: 0;
  width: 100%
}

.scrollbar-outer>.scroll-element.scroll-y {
  height: 100%;
  right: 0;
  top: 0;
  width: 12px
}

.scrollbar-outer>.scroll-element.scroll-x .scroll-element_outer {
  height: 7px;
  top: 2px
}

.scrollbar-outer>.scroll-element.scroll-y .scroll-element_outer {
  left: 2px;
  width: 7px
}

.scrollbar-outer>.scroll-element .scroll-element_track {
  background-color: #eee
}

.scrollbar-outer>.scroll-element .scroll-bar,
.scrollbar-outer>.scroll-element .scroll-element_outer,
.scrollbar-outer>.scroll-element .scroll-element_track {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px
}

.scrollbar-outer>.scroll-element .scroll-bar {
  background-color: #d9d9d9
}

.scrollbar-outer>.scroll-element .scroll-bar:hover {
  background-color: #c2c2c2
}

.scrollbar-outer>.scroll-element.scroll-draggable .scroll-bar {
  background-color: #919191
}

.scrollbar-outer>.scroll-content.scroll-scrolly_visible {
  left: -12px;
  margin-left: 12px
}

.scrollbar-outer>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size,
.scrollbar-outer>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track {
  left: -14px
}

.scrollbar-outer>.scroll-content.scroll-scrollx_visible {
  top: -12px;
  margin-top: 12px
}

.scrollbar-outer>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size,
.scrollbar-outer>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track {
  top: -14px
}

.scrollbar-outer>.scroll-element.scroll-x .scroll-bar {
  min-width: 10px
}

.scrollbar-outer>.scroll-element.scroll-y .scroll-bar {
  min-height: 10px
}

.scrollbar-macosx>.scroll-element {
  background: 0 0;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10
}

.scrollbar-macosx>.scroll-element div {
  background: 0 0;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-macosx>.scroll-element .scroll-element_track {
  display: none
}

.scrollbar-macosx>.scroll-element .scroll-bar {
  background-color: #6c6e71;
  display: block;
  opacity: 0;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
  -webkit-transition: opacity .2s linear;
  -moz-transition: opacity .2s linear;
  -o-transition: opacity .2s linear;
  -ms-transition: opacity .2s linear;
  transition: opacity .2s linear
}

.scrollbar-macosx:hover>.scroll-element .scroll-bar {
  opacity: .7
}

.scrollbar-macosx>.scroll-element.scroll-draggable .scroll-bar {
  opacity: .7
}

.scrollbar-macosx>.scroll-element.scroll-x {
  bottom: 0;
  height: 0;
  left: 0;
  min-width: 100%;
  overflow: visible;
  width: 100%
}

.scrollbar-macosx>.scroll-element.scroll-y {
  height: 100%;
  min-height: 100%;
  right: 0;
  top: 0;
  width: 0
}

.scrollbar-macosx>.scroll-element.scroll-x .scroll-bar {
  height: 7px;
  min-width: 10px;
  top: -9px
}

.scrollbar-macosx>.scroll-element.scroll-y .scroll-bar {
  left: -9px;
  min-height: 10px;
  width: 7px
}

.scrollbar-macosx>.scroll-element.scroll-x .scroll-element_outer {
  left: 2px
}

.scrollbar-macosx>.scroll-element.scroll-x .scroll-element_size {
  left: -4px
}

.scrollbar-macosx>.scroll-element.scroll-y .scroll-element_outer {
  top: 2px
}

.scrollbar-macosx>.scroll-element.scroll-y .scroll-element_size {
  top: -4px
}

.scrollbar-macosx>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size {
  left: -11px
}

.scrollbar-macosx>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size {
  top: -11px
}

.scrollbar-light>.scroll-element {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  background-color: #fff
}

.scrollbar-light>.scroll-element div {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-light>.scroll-element .scroll-element_outer {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px
}

.scrollbar-light>.scroll-element .scroll-element_size {
  background: -moz-linear-gradient(left, #dbdbdb 0, #e8e8e8 100%);
  background: -webkit-gradient(linear, left top, right top, color-stop(0, #dbdbdb), color-stop(100%, #e8e8e8));
  background: -webkit-linear-gradient(left, #dbdbdb 0, #e8e8e8 100%);
  background: -o-linear-gradient(left, #dbdbdb 0, #e8e8e8 100%);
  background: -ms-linear-gradient(left, #dbdbdb 0, #e8e8e8 100%);
  background: linear-gradient(to right, #dbdbdb 0, #e8e8e8 100%);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px
}

.scrollbar-light>.scroll-element.scroll-x {
  bottom: 0;
  height: 17px;
  left: 0;
  min-width: 100%;
  width: 100%
}

.scrollbar-light>.scroll-element.scroll-y {
  height: 100%;
  min-height: 100%;
  right: 0;
  top: 0;
  width: 17px
}

.scrollbar-light>.scroll-element .scroll-bar {
  background: -moz-linear-gradient(left, #fefefe 0, #f5f5f5 100%);
  background: -webkit-gradient(linear, left top, right top, color-stop(0, #fefefe), color-stop(100%, #f5f5f5));
  background: -webkit-linear-gradient(left, #fefefe 0, #f5f5f5 100%);
  background: -o-linear-gradient(left, #fefefe 0, #f5f5f5 100%);
  background: -ms-linear-gradient(left, #fefefe 0, #f5f5f5 100%);
  background: linear-gradient(to right, #fefefe 0, #f5f5f5 100%);
  border: 1px solid #dbdbdb;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px
}

.scrollbar-light>.scroll-content.scroll-scrolly_visible {
  left: -17px;
  margin-left: 17px
}

.scrollbar-light>.scroll-content.scroll-scrollx_visible {
  top: -17px;
  margin-top: 17px
}

.scrollbar-light>.scroll-element.scroll-x .scroll-bar {
  height: 10px;
  min-width: 10px;
  top: 0
}

.scrollbar-light>.scroll-element.scroll-y .scroll-bar {
  left: 0;
  min-height: 10px;
  width: 10px
}

.scrollbar-light>.scroll-element.scroll-x .scroll-element_outer {
  height: 12px;
  left: 2px;
  top: 2px
}

.scrollbar-light>.scroll-element.scroll-x .scroll-element_size {
  left: -4px
}

.scrollbar-light>.scroll-element.scroll-y .scroll-element_outer {
  left: 2px;
  top: 2px;
  width: 12px
}

.scrollbar-light>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size,
.scrollbar-light>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track {
  left: -19px
}

.scrollbar-light>.scroll-element.scroll-y .scroll-element_size {
  top: -4px
}

.scrollbar-light>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size,
.scrollbar-light>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track {
  top: -19px
}

.scrollbar-rail>.scroll-element {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  background-color: #fff
}

.scrollbar-rail>.scroll-element div {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-rail>.scroll-element .scroll-element_size {
  background-color: #999;
  background-color: rgba(0, 0, 0, .3)
}

.scrollbar-rail>.scroll-element .scroll-element_outer:hover .scroll-element_size {
  background-color: #666;
  background-color: rgba(0, 0, 0, .5)
}

.scrollbar-rail>.scroll-element.scroll-x {
  bottom: 0;
  height: 12px;
  left: 0;
  min-width: 100%;
  padding: 3px 0 2px;
  width: 100%
}

.scrollbar-rail>.scroll-element.scroll-y {
  height: 100%;
  min-height: 100%;
  padding: 0 2px 0 3px;
  right: 0;
  top: 0;
  width: 12px
}

.scrollbar-rail>.scroll-element .scroll-bar {
  background-color: #d0b9a0;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .5)
}

.scrollbar-rail>.scroll-element .scroll-element_outer:hover .scroll-bar {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .6)
}

.scrollbar-rail>.scroll-content.scroll-scrolly_visible {
  left: -17px;
  margin-left: 17px
}

.scrollbar-rail>.scroll-content.scroll-scrollx_visible {
  margin-top: 17px;
  top: -17px
}

.scrollbar-rail>.scroll-element.scroll-x .scroll-bar {
  height: 10px;
  min-width: 10px;
  top: 1px
}

.scrollbar-rail>.scroll-element.scroll-y .scroll-bar {
  left: 1px;
  min-height: 10px;
  width: 10px
}

.scrollbar-rail>.scroll-element.scroll-x .scroll-element_outer {
  height: 15px;
  left: 5px
}

.scrollbar-rail>.scroll-element.scroll-x .scroll-element_size {
  height: 2px;
  left: -10px;
  top: 5px
}

.scrollbar-rail>.scroll-element.scroll-y .scroll-element_outer {
  top: 5px;
  width: 15px
}

.scrollbar-rail>.scroll-element.scroll-y .scroll-element_size {
  left: 5px;
  top: -10px;
  width: 2px
}

.scrollbar-rail>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size,
.scrollbar-rail>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track {
  left: -25px
}

.scrollbar-rail>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size,
.scrollbar-rail>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track {
  top: -25px
}

.scrollbar-dynamic>.scroll-element {
  background: 0 0;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10
}

.scrollbar-dynamic>.scroll-element div {
  background: 0 0;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-dynamic>.scroll-element.scroll-x {
  bottom: 2px;
  height: 7px;
  left: 0;
  min-width: 100%;
  width: 100%
}

.scrollbar-dynamic>.scroll-element.scroll-y {
  height: 100%;
  min-height: 100%;
  right: 2px;
  top: 0;
  width: 7px
}

.scrollbar-dynamic>.scroll-element .scroll-element_outer {
  opacity: .3;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px
}

.scrollbar-dynamic>.scroll-element .scroll-element_size {
  background-color: #ccc;
  opacity: 0;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  -webkit-transition: opacity .2s;
  -moz-transition: opacity .2s;
  -o-transition: opacity .2s;
  -ms-transition: opacity .2s;
  transition: opacity .2s
}

.scrollbar-dynamic>.scroll-element .scroll-bar {
  background-color: #6c6e71;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px
}

.scrollbar-dynamic>.scroll-element.scroll-x .scroll-bar {
  bottom: 0;
  height: 7px;
  min-width: 24px;
  top: auto
}

.scrollbar-dynamic>.scroll-element.scroll-y .scroll-bar {
  left: auto;
  min-height: 24px;
  right: 0;
  width: 7px
}

.scrollbar-dynamic>.scroll-element.scroll-x .scroll-element_outer {
  bottom: 0;
  top: auto;
  left: 2px;
  -webkit-transition: height .2s;
  -moz-transition: height .2s;
  -o-transition: height .2s;
  -ms-transition: height .2s;
  transition: height .2s
}

.scrollbar-dynamic>.scroll-element.scroll-y .scroll-element_outer {
  left: auto;
  right: 0;
  top: 2px;
  -webkit-transition: width .2s;
  -moz-transition: width .2s;
  -o-transition: width .2s;
  -ms-transition: width .2s;
  transition: width .2s
}

.scrollbar-dynamic>.scroll-element.scroll-x .scroll-element_size {
  left: -4px
}

.scrollbar-dynamic>.scroll-element.scroll-y .scroll-element_size {
  top: -4px
}

.scrollbar-dynamic>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size {
  left: -11px
}

.scrollbar-dynamic>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size {
  top: -11px
}

.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer,
.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer {
  overflow: hidden;
  opacity: .7
}

.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer .scroll-element_size,
.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer .scroll-element_size {
  opacity: 1
}

.scrollbar-dynamic>.scroll-element.scroll-draggable .scroll-element_outer .scroll-bar,
.scrollbar-dynamic>.scroll-element:hover .scroll-element_outer .scroll-bar {
  height: 100%;
  width: 100%;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px
}

.scrollbar-dynamic>.scroll-element.scroll-x.scroll-draggable .scroll-element_outer,
.scrollbar-dynamic>.scroll-element.scroll-x:hover .scroll-element_outer {
  height: 20px;
  min-height: 7px
}

.scrollbar-dynamic>.scroll-element.scroll-y.scroll-draggable .scroll-element_outer,
.scrollbar-dynamic>.scroll-element.scroll-y:hover .scroll-element_outer {
  min-width: 7px;
  width: 20px
}

.scrollbar-chrome>.scroll-element {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  background-color: #fff
}

.scrollbar-chrome>.scroll-element div {
  border: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  z-index: 10;
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%
}

.scrollbar-chrome>.scroll-element .scroll-element_track {
  background: #f1f1f1;
  border: 1px solid #dbdbdb
}

.scrollbar-chrome>.scroll-element.scroll-x {
  bottom: 0;
  height: 16px;
  left: 0;
  min-width: 100%;
  width: 100%
}

.scrollbar-chrome>.scroll-element.scroll-y {
  height: 100%;
  min-height: 100%;
  right: 0;
  top: 0;
  width: 16px
}

.scrollbar-chrome>.scroll-element .scroll-bar {
  background-color: #d9d9d9;
  border: 1px solid #bdbdbd;
  cursor: default;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px
}

.scrollbar-chrome>.scroll-element .scroll-bar:hover {
  background-color: #c2c2c2;
  border-color: #a9a9a9
}

.scrollbar-chrome>.scroll-element.scroll-draggable .scroll-bar {
  background-color: #919191;
  border-color: #7e7e7e
}

.scrollbar-chrome>.scroll-content.scroll-scrolly_visible {
  left: -16px;
  margin-left: 16px
}

.scrollbar-chrome>.scroll-content.scroll-scrollx_visible {
  top: -16px;
  margin-top: 16px
}

.scrollbar-chrome>.scroll-element.scroll-x .scroll-bar {
  height: 5px;
  min-width: 10px;
  top: 3px
}

.scrollbar-chrome>.scroll-element.scroll-y .scroll-bar {
  left: 3px;
  min-height: 10px;
  width: 5px
}

.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_outer {
  border-left: 1px solid #dbdbdb
}

.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_track {
  height: 14px;
  left: -3px
}

.scrollbar-chrome>.scroll-element.scroll-x .scroll-element_size {
  height: 14px;
  left: -4px
}

.scrollbar-chrome>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_size,
.scrollbar-chrome>.scroll-element.scroll-x.scroll-scrolly_visible .scroll-element_track {
  left: -19px
}

.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_outer {
  border-top: 1px solid #dbdbdb
}

.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_track {
  top: -3px;
  width: 14px
}

.scrollbar-chrome>.scroll-element.scroll-y .scroll-element_size {
  top: -4px;
  width: 14px
}

.scrollbar-chrome>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_size,
.scrollbar-chrome>.scroll-element.scroll-y.scroll-scrollx_visible .scroll-element_track {
  top: -19px
}

/*!
* animate.css -http://daneden.me/animate
* Version - 3.6.0
* Licensed under the MIT license - http://opensource.org/licenses/MIT
*
* Copyright (c) 2018 Daniel Eden
*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite
}

@-webkit-keyframes bounce {

  20%,
  53%,
  80%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0)
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0)
  }
}

@keyframes bounce {

  20%,
  53%,
  80%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0)
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    animation-timing-function: cubic-bezier(.755, .05, .855, .06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0)
  }
}

.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom
}

@-webkit-keyframes flash {

  50%,
  from,
  to {
    opacity: 1
  }

  25%,
  75% {
    opacity: 0
  }
}

@keyframes flash {

  50%,
  from,
  to {
    opacity: 1
  }

  25%,
  75% {
    opacity: 0
  }
}

.flash {
  -webkit-animation-name: flash;
  animation-name: flash
}

@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.pulse {
  -webkit-animation-name: pulse;
  animation-name: pulse
}

@-webkit-keyframes rubberBand {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  30% {
    -webkit-transform: scale3d(1.25, .75, 1);
    transform: scale3d(1.25, .75, 1)
  }

  40% {
    -webkit-transform: scale3d(.75, 1.25, 1);
    transform: scale3d(.75, 1.25, 1)
  }

  50% {
    -webkit-transform: scale3d(1.15, .85, 1);
    transform: scale3d(1.15, .85, 1)
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
    transform: scale3d(.95, 1.05, 1)
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
    transform: scale3d(1.05, .95, 1)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

@keyframes rubberBand {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  30% {
    -webkit-transform: scale3d(1.25, .75, 1);
    transform: scale3d(1.25, .75, 1)
  }

  40% {
    -webkit-transform: scale3d(.75, 1.25, 1);
    transform: scale3d(.75, 1.25, 1)
  }

  50% {
    -webkit-transform: scale3d(1.15, .85, 1);
    transform: scale3d(1.15, .85, 1)
  }

  65% {
    -webkit-transform: scale3d(.95, 1.05, 1);
    transform: scale3d(.95, 1.05, 1)
  }

  75% {
    -webkit-transform: scale3d(1.05, .95, 1);
    transform: scale3d(1.05, .95, 1)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.rubberBand {
  -webkit-animation-name: rubberBand;
  animation-name: rubberBand
}

@-webkit-keyframes shake {

  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0)
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0)
  }
}

@keyframes shake {

  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0)
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0)
  }
}

.shake {
  -webkit-animation-name: shake;
  animation-name: shake
}

@-webkit-keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg)
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg)
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg)
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg)
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }
}

@keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg)
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg)
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg)
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg)
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }
}

.headShake {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-name: headShake;
  animation-name: headShake
}

@-webkit-keyframes swing {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 15deg);
    transform: rotate3d(0, 0, 1, 15deg)
  }

  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg)
  }

  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg)
  }

  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg)
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg)
  }
}

@keyframes swing {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 15deg);
    transform: rotate3d(0, 0, 1, 15deg)
  }

  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg)
  }

  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg)
  }

  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg)
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg)
  }
}

.swing {
  -webkit-transform-origin: top center;
  transform-origin: top center;
  -webkit-animation-name: swing;
  animation-name: swing
}

@-webkit-keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  10%,
  20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

@keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }

  10%,
  20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.tada {
  -webkit-animation-name: tada;
  animation-name: tada
}

@-webkit-keyframes wobble {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  15% {
    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)
  }

  30% {
    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)
  }

  45% {
    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)
  }

  60% {
    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)
  }

  75% {
    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes wobble {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  15% {
    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)
  }

  30% {
    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)
  }

  45% {
    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)
  }

  60% {
    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)
  }

  75% {
    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.wobble {
  -webkit-animation-name: wobble;
  animation-name: wobble
}

@-webkit-keyframes jello {

  11.1%,
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  22.2% {
    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);
    transform: skewX(-12.5deg) skewY(-12.5deg)
  }

  33.3% {
    -webkit-transform: skewX(6.25deg) skewY(6.25deg);
    transform: skewX(6.25deg) skewY(6.25deg)
  }

  44.4% {
    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);
    transform: skewX(-3.125deg) skewY(-3.125deg)
  }

  55.5% {
    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);
    transform: skewX(1.5625deg) skewY(1.5625deg)
  }

  66.6% {
    -webkit-transform: skewX(-.78125deg) skewY(-.78125deg);
    transform: skewX(-.78125deg) skewY(-.78125deg)
  }

  77.7% {
    -webkit-transform: skewX(.39063deg) skewY(.39063deg);
    transform: skewX(.39063deg) skewY(.39063deg)
  }

  88.8% {
    -webkit-transform: skewX(-.19531deg) skewY(-.19531deg);
    transform: skewX(-.19531deg) skewY(-.19531deg)
  }
}

@keyframes jello {

  11.1%,
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  22.2% {
    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);
    transform: skewX(-12.5deg) skewY(-12.5deg)
  }

  33.3% {
    -webkit-transform: skewX(6.25deg) skewY(6.25deg);
    transform: skewX(6.25deg) skewY(6.25deg)
  }

  44.4% {
    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);
    transform: skewX(-3.125deg) skewY(-3.125deg)
  }

  55.5% {
    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);
    transform: skewX(1.5625deg) skewY(1.5625deg)
  }

  66.6% {
    -webkit-transform: skewX(-.78125deg) skewY(-.78125deg);
    transform: skewX(-.78125deg) skewY(-.78125deg)
  }

  77.7% {
    -webkit-transform: skewX(.39063deg) skewY(.39063deg);
    transform: skewX(.39063deg) skewY(.39063deg)
  }

  88.8% {
    -webkit-transform: skewX(-.19531deg) skewY(-.19531deg);
    transform: skewX(-.19531deg) skewY(-.19531deg)
  }
}

.jello {
  -webkit-animation-name: jello;
  animation-name: jello;
  -webkit-transform-origin: center;
  transform-origin: center
}

@-webkit-keyframes bounceIn {

  20%,
  40%,
  60%,
  80%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

@keyframes bounceIn {

  20%,
  40%,
  60%,
  80%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.bounceIn {
  -webkit-animation-duration: .75s;
  animation-duration: .75s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn
}

@-webkit-keyframes bounceInDown {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0)
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes bounceInDown {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0)
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown
}

@-webkit-keyframes bounceInLeft {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0)
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0)
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes bounceInLeft {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0)
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0)
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.bounceInLeft {
  -webkit-animation-name: bounceInLeft;
  animation-name: bounceInLeft
}

@-webkit-keyframes bounceInRight {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0)
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0)
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes bounceInRight {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0)
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0)
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.bounceInRight {
  -webkit-animation-name: bounceInRight;
  animation-name: bounceInRight
}

@-webkit-keyframes bounceInUp {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0)
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes bounceInUp {

  60%,
  75%,
  90%,
  from,
  to {
    -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
    animation-timing-function: cubic-bezier(.215, .61, .355, 1)
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0)
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0)
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0)
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0)
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.bounceInUp {
  -webkit-animation-name: bounceInUp;
  animation-name: bounceInUp
}

@-webkit-keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
}

@keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
}

.bounceOut {
  -webkit-animation-duration: .75s;
  animation-duration: .75s;
  -webkit-animation-name: bounceOut;
  animation-name: bounceOut
}

@-webkit-keyframes bounceOutDown {
  20% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0)
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }
}

@keyframes bounceOutDown {
  20% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0)
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }
}

.bounceOutDown {
  -webkit-animation-name: bounceOutDown;
  animation-name: bounceOutDown
}

@-webkit-keyframes bounceOutLeft {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }
}

@keyframes bounceOutLeft {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }
}

.bounceOutLeft {
  -webkit-animation-name: bounceOutLeft;
  animation-name: bounceOutLeft
}

@-webkit-keyframes bounceOutRight {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(-20px, 0, 0);
    transform: translate3d(-20px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }
}

@keyframes bounceOutRight {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(-20px, 0, 0);
    transform: translate3d(-20px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }
}

.bounceOutRight {
  -webkit-animation-name: bounceOutRight;
  animation-name: bounceOutRight
}

@-webkit-keyframes bounceOutUp {
  20% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, 20px, 0);
    transform: translate3d(0, 20px, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }
}

@keyframes bounceOutUp {
  20% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0)
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, 20px, 0);
    transform: translate3d(0, 20px, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }
}

.bounceOutUp {
  -webkit-animation-name: bounceOutUp;
  animation-name: bounceOutUp
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown
}

@-webkit-keyframes fadeInDownBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInDownBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInDownBig {
  -webkit-animation-name: fadeInDownBig;
  animation-name: fadeInDownBig
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft
}

@-webkit-keyframes fadeInLeftBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInLeftBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInLeftBig {
  -webkit-animation-name: fadeInLeftBig;
  animation-name: fadeInLeftBig
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight
}

@-webkit-keyframes fadeInRightBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInRightBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInRightBig {
  -webkit-animation-name: fadeInRightBig;
  animation-name: fadeInRightBig
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp
}

@-webkit-keyframes fadeInUpBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes fadeInUpBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.fadeInUpBig {
  -webkit-animation-name: fadeInUpBig;
  animation-name: fadeInUpBig
}

@-webkit-keyframes fadeOut {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes fadeOut {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut
}

@-webkit-keyframes fadeOutDown {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown
}

@-webkit-keyframes fadeOutDownBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }
}

@keyframes fadeOutDownBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0)
  }
}

.fadeOutDownBig {
  -webkit-animation-name: fadeOutDownBig;
  animation-name: fadeOutDownBig
}

@-webkit-keyframes fadeOutLeft {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

@keyframes fadeOutLeft {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

.fadeOutLeft {
  -webkit-animation-name: fadeOutLeft;
  animation-name: fadeOutLeft
}

@-webkit-keyframes fadeOutLeftBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }
}

@keyframes fadeOutLeftBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0)
  }
}

.fadeOutLeftBig {
  -webkit-animation-name: fadeOutLeftBig;
  animation-name: fadeOutLeftBig
}

@-webkit-keyframes fadeOutRight {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

.fadeOutRight {
  -webkit-animation-name: fadeOutRight;
  animation-name: fadeOutRight
}

@-webkit-keyframes fadeOutRightBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }
}

@keyframes fadeOutRightBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(2000px, 0, 0);
    transform: translate3d(2000px, 0, 0)
  }
}

.fadeOutRightBig {
  -webkit-animation-name: fadeOutRightBig;
  animation-name: fadeOutRightBig
}

@-webkit-keyframes fadeOutUp {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp
}

@-webkit-keyframes fadeOutUpBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }
}

@keyframes fadeOutUpBig {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0)
  }
}

.fadeOutUpBig {
  -webkit-animation-name: fadeOutUpBig;
  animation-name: fadeOutUpBig
}

@-webkit-keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  40% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);
    transform: perspective(400px) scale3d(.95, .95, .95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }
}

@keyframes flip {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  40% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  50% {
    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  80% {
    -webkit-transform: perspective(400px) scale3d(.95, .95, .95);
    transform: perspective(400px) scale3d(.95, .95, .95);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }
}

.animated.flip {
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  -webkit-animation-name: flip;
  animation-name: flip
}

@-webkit-keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg)
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }
}

@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg)
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }
}

.flipInX {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX
}

@-webkit-keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg)
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }
}

@keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg)
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }
}

.flipInY {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInY;
  animation-name: flipInY
}

@-webkit-keyframes flipOutX {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }

  30% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1
  }

  to {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0
  }
}

@keyframes flipOutX {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }

  30% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1
  }

  to {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0
  }
}

.flipOutX {
  -webkit-animation-duration: .75s;
  animation-duration: .75s;
  -webkit-animation-name: flipOutX;
  animation-name: flipOutX;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important
}

@-webkit-keyframes flipOutY {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }

  30% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1
  }

  to {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0
  }
}

@keyframes flipOutY {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px)
  }

  30% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1
  }

  to {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0
  }
}

.flipOutY {
  -webkit-animation-duration: .75s;
  animation-duration: .75s;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipOutY;
  animation-name: flipOutY
}

@-webkit-keyframes lightSpeedIn {
  from {
    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0
  }

  60% {
    -webkit-transform: skewX(20deg);
    transform: skewX(20deg);
    opacity: 1
  }

  80% {
    -webkit-transform: skewX(-5deg);
    transform: skewX(-5deg);
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes lightSpeedIn {
  from {
    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
    transform: translate3d(100%, 0, 0) skewX(-30deg);
    opacity: 0
  }

  60% {
    -webkit-transform: skewX(20deg);
    transform: skewX(20deg);
    opacity: 1
  }

  80% {
    -webkit-transform: skewX(-5deg);
    transform: skewX(-5deg);
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.lightSpeedIn {
  -webkit-animation-name: lightSpeedIn;
  animation-name: lightSpeedIn;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out
}

@-webkit-keyframes lightSpeedOut {
  from {
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0
  }
}

@keyframes lightSpeedOut {
  from {
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0
  }
}

.lightSpeedOut {
  -webkit-animation-name: lightSpeedOut;
  animation-name: lightSpeedOut;
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in
}

@-webkit-keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.rotateIn {
  -webkit-animation-name: rotateIn;
  animation-name: rotateIn
}

@-webkit-keyframes rotateInDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes rotateInDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.rotateInDownLeft {
  -webkit-animation-name: rotateInDownLeft;
  animation-name: rotateInDownLeft
}

@-webkit-keyframes rotateInDownRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes rotateInDownRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.rotateInDownRight {
  -webkit-animation-name: rotateInDownRight;
  animation-name: rotateInDownRight
}

@-webkit-keyframes rotateInUpLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes rotateInUpLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.rotateInUpLeft {
  -webkit-animation-name: rotateInUpLeft;
  animation-name: rotateInUpLeft
}

@-webkit-keyframes rotateInUpRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, -90deg);
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@keyframes rotateInUpRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, -90deg);
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.rotateInUpRight {
  -webkit-animation-name: rotateInUpRight;
  animation-name: rotateInUpRight
}

@-webkit-keyframes rotateOut {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    opacity: 1
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, 200deg);
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0
  }
}

@keyframes rotateOut {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    opacity: 1
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, 200deg);
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0
  }
}

.rotateOut {
  -webkit-animation-name: rotateOut;
  animation-name: rotateOut
}

@-webkit-keyframes rotateOutDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }
}

@keyframes rotateOutDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0
  }
}

.rotateOutDownLeft {
  -webkit-animation-name: rotateOutDownLeft;
  animation-name: rotateOutDownLeft
}

@-webkit-keyframes rotateOutDownRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }
}

@keyframes rotateOutDownRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }
}

.rotateOutDownRight {
  -webkit-animation-name: rotateOutDownRight;
  animation-name: rotateOutDownRight
}

@-webkit-keyframes rotateOutUpLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }
}

@keyframes rotateOutUpLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0
  }
}

.rotateOutUpLeft {
  -webkit-animation-name: rotateOutUpLeft;
  animation-name: rotateOutUpLeft
}

@-webkit-keyframes rotateOutUpRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, 90deg);
    transform: rotate3d(0, 0, 1, 90deg);
    opacity: 0
  }
}

@keyframes rotateOutUpRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    opacity: 1
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, 90deg);
    transform: rotate3d(0, 0, 1, 90deg);
    opacity: 0
  }
}

.rotateOutUpRight {
  -webkit-animation-name: rotateOutUpRight;
  animation-name: rotateOutUpRight
}

@-webkit-keyframes hinge {
  0% {
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }

  20%,
  60% {
    -webkit-transform: rotate3d(0, 0, 1, 80deg);
    transform: rotate3d(0, 0, 1, 80deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }

  40%,
  80% {
    -webkit-transform: rotate3d(0, 0, 1, 60deg);
    transform: rotate3d(0, 0, 1, 60deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(0, 700px, 0);
    transform: translate3d(0, 700px, 0);
    opacity: 0
  }
}

@keyframes hinge {
  0% {
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }

  20%,
  60% {
    -webkit-transform: rotate3d(0, 0, 1, 80deg);
    transform: rotate3d(0, 0, 1, 80deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
  }

  40%,
  80% {
    -webkit-transform: rotate3d(0, 0, 1, 60deg);
    transform: rotate3d(0, 0, 1, 60deg);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    opacity: 1
  }

  to {
    -webkit-transform: translate3d(0, 700px, 0);
    transform: translate3d(0, 700px, 0);
    opacity: 0
  }
}

.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-name: hinge;
  animation-name: hinge
}

@-webkit-keyframes jackInTheBox {
  from {
    opacity: 0;
    -webkit-transform: scale(.1) rotate(30deg);
    transform: scale(.1) rotate(30deg);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom
  }

  50% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg)
  }

  70% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg)
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1)
  }
}

@keyframes jackInTheBox {
  from {
    opacity: 0;
    -webkit-transform: scale(.1) rotate(30deg);
    transform: scale(.1) rotate(30deg);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom
  }

  50% {
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg)
  }

  70% {
    -webkit-transform: rotate(3deg);
    transform: rotate(3deg)
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1)
  }
}

.jackInTheBox {
  -webkit-animation-name: jackInTheBox;
  animation-name: jackInTheBox
}

@-webkit-keyframes rollIn {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes rollIn {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.rollIn {
  -webkit-animation-name: rollIn;
  animation-name: rollIn
}

@-webkit-keyframes rollOut {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)
  }
}

@keyframes rollOut {
  from {
    opacity: 1
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)
  }
}

.rollOut {
  -webkit-animation-name: rollOut;
  animation-name: rollOut
}

@-webkit-keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  50% {
    opacity: 1
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  50% {
    opacity: 1
  }
}

.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn
}

@-webkit-keyframes zoomInDown {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomInDown {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomInDown {
  -webkit-animation-name: zoomInDown;
  animation-name: zoomInDown
}

@-webkit-keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomInLeft {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
    transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomInLeft {
  -webkit-animation-name: zoomInLeft;
  animation-name: zoomInLeft
}

@-webkit-keyframes zoomInRight {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomInRight {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
    transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomInRight {
  -webkit-animation-name: zoomInRight;
  animation-name: zoomInRight
}

@-webkit-keyframes zoomInUp {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomInUp {
  from {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomInUp {
  -webkit-animation-name: zoomInUp;
  animation-name: zoomInUp
}

@-webkit-keyframes zoomOut {
  from {
    opacity: 1
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  to {
    opacity: 0
  }
}

@keyframes zoomOut {
  from {
    opacity: 1
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  to {
    opacity: 0
  }
}

.zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut
}

@-webkit-keyframes zoomOutDown {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomOutDown {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomOutDown {
  -webkit-animation-name: zoomOutDown;
  animation-name: zoomOutDown
}

@-webkit-keyframes zoomOutLeft {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);
    transform: scale(.1) translate3d(-2000px, 0, 0);
    -webkit-transform-origin: left center;
    transform-origin: left center
  }
}

@keyframes zoomOutLeft {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: scale(.1) translate3d(-2000px, 0, 0);
    transform: scale(.1) translate3d(-2000px, 0, 0);
    -webkit-transform-origin: left center;
    transform-origin: left center
  }
}

.zoomOutLeft {
  -webkit-animation-name: zoomOutLeft;
  animation-name: zoomOutLeft
}

@-webkit-keyframes zoomOutRight {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);
    transform: scale(.1) translate3d(2000px, 0, 0);
    -webkit-transform-origin: right center;
    transform-origin: right center
  }
}

@keyframes zoomOutRight {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);
    transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0)
  }

  to {
    opacity: 0;
    -webkit-transform: scale(.1) translate3d(2000px, 0, 0);
    transform: scale(.1) translate3d(2000px, 0, 0);
    -webkit-transform-origin: right center;
    transform-origin: right center
  }
}

.zoomOutRight {
  -webkit-animation-name: zoomOutRight;
  animation-name: zoomOutRight
}

@-webkit-keyframes zoomOutUp {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

@keyframes zoomOutUp {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
    animation-timing-function: cubic-bezier(.55, .055, .675, .19)
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);
    transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
    animation-timing-function: cubic-bezier(.175, .885, .32, 1)
  }
}

.zoomOutUp {
  -webkit-animation-name: zoomOutUp;
  animation-name: zoomOutUp
}

@-webkit-keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.slideInDown {
  -webkit-animation-name: slideInDown;
  animation-name: slideInDown
}

@-webkit-keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.slideInLeft {
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft
}

@-webkit-keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.slideInRight {
  -webkit-animation-name: slideInRight;
  animation-name: slideInRight
}

@-webkit-keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
}

.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp
}

@-webkit-keyframes slideOutDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

@keyframes slideOutDown {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

.slideOutDown {
  -webkit-animation-name: slideOutDown;
  animation-name: slideOutDown
}

@-webkit-keyframes slideOutLeft {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

@keyframes slideOutLeft {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

.slideOutLeft {
  -webkit-animation-name: slideOutLeft;
  animation-name: slideOutLeft
}

@-webkit-keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

@keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

.slideOutRight {
  -webkit-animation-name: slideOutRight;
  animation-name: slideOutRight
}

@-webkit-keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

@keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

.slideOutUp {
  -webkit-animation-name: slideOutUp;
  animation-name: slideOutUp
}

.swal-footer {
  text-align: center !important;
  margin-bottom: 20px !important
}

table.dataTable {
  clear: both;
  margin-top: 15px !important;
  margin-bottom: 15px !important;
  max-width: none !important;
  border-collapse: separate !important
}

table.dataTable td,
table.dataTable th {
  -webkit-box-sizing: content-box;
  box-sizing: content-box
}

table.dataTable td.dataTables_empty,
table.dataTable th.dataTables_empty {
  text-align: center
}

table.dataTable.nowrap td,
table.dataTable.nowrap th {
  white-space: nowrap
}

div.dataTables_wrapper div.dataTables_length label {
  font-weight: 400;
  text-align: left;
  white-space: nowrap
}

div.dataTables_wrapper div.dataTables_length select {
  width: 75px;
  display: inline-block
}

div.dataTables_wrapper div.dataTables_filter {
  text-align: right
}

div.dataTables_wrapper div.dataTables_filter label {
  font-weight: 400;
  white-space: nowrap;
  text-align: left
}

div.dataTables_wrapper div.dataTables_filter input {
  margin-left: .5em;
  display: inline-block;
  width: auto
}

div.dataTables_wrapper div.dataTables_info {
  padding-top: .85em;
  white-space: nowrap
}

div.dataTables_wrapper div.dataTables_paginate {
  margin: 0;
  white-space: nowrap;
  text-align: right
}

div.dataTables_wrapper div.dataTables_paginate ul.pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end
}

div.dataTables_wrapper div.dataTables_processing {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
  margin-top: -26px;
  text-align: center;
  padding: 1em 0
}

table.dataTable thead>tr>td.sorting,
table.dataTable thead>tr>td.sorting_asc,
table.dataTable thead>tr>td.sorting_desc,
table.dataTable thead>tr>th.sorting,
table.dataTable thead>tr>th.sorting_asc,
table.dataTable thead>tr>th.sorting_desc {
  padding-right: 30px
}

table.dataTable thead>tr>td:active,
table.dataTable thead>tr>th:active {
  outline: 0
}

table.dataTable thead .sorting,
table.dataTable thead .sorting_asc,
table.dataTable thead .sorting_asc_disabled,
table.dataTable thead .sorting_desc,
table.dataTable thead .sorting_desc_disabled {
  cursor: pointer;
  position: relative
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting:before,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_asc_disabled:after,
table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc:after,
table.dataTable thead .sorting_desc:before,
table.dataTable thead .sorting_desc_disabled:after,
table.dataTable thead .sorting_desc_disabled:before {
  position: absolute;
  bottom: .9em;
  display: block;
  opacity: .5
}

table.dataTable thead .sorting:before,
table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc:before,
table.dataTable thead .sorting_desc_disabled:before {
  right: 1em;
  font-size: 15px
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_asc_disabled:after,
table.dataTable thead .sorting_desc:after,
table.dataTable thead .sorting_desc_disabled:after {
  right: .5em;
  font-size: 15px
}

table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_desc:after {
  opacity: 1
}

table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc_disabled:after {
  opacity: 0
}

div.dataTables_scrollHead table.dataTable {
  margin-bottom: 0 !important
}

div.dataTables_scrollBody table {
  border-top: none;
  margin-top: 0 !important;
  margin-bottom: 0 !important
}

div.dataTables_scrollBody table thead .sorting:after,
div.dataTables_scrollBody table thead .sorting_asc:after,
div.dataTables_scrollBody table thead .sorting_desc:after {
  display: none
}

div.dataTables_scrollBody table tbody tr:first-child td,
div.dataTables_scrollBody table tbody tr:first-child th {
  border-top: none
}

div.dataTables_scrollFoot>.dataTables_scrollFootInner {
  box-sizing: content-box
}

div.dataTables_scrollFoot>.dataTables_scrollFootInner>table {
  margin-top: 0 !important;
  border-top: none
}

@media screen and (max-width:767px) {

  div.dataTables_wrapper div.dataTables_filter,
  div.dataTables_wrapper div.dataTables_info,
  div.dataTables_wrapper div.dataTables_length,
  div.dataTables_wrapper div.dataTables_paginate {
    text-align: center;
    margin-top: 11px;
    margin-bottom: 10px
  }

  div.dataTables_wrapper div div.dataTables_paginate ul.pagination {
    flex-wrap: wrap !important;
    justify-content: center !important
  }

  div.dataTables_wrapper div div.dataTables_paginate ul.pagination li {
    margin-bottom: 10px
  }

  div.dataTables_wrapper div div.dataTables_paginate ul.pagination li a {
    font-size: 11px
  }
}

table.dataTable.table-sm>thead>tr>th {
  padding-right: 20px
}

table.dataTable.table-sm .sorting:before,
table.dataTable.table-sm .sorting_asc:before,
table.dataTable.table-sm .sorting_desc:before {
  top: 5px;
  right: .85em
}

table.dataTable.table-sm .sorting:after,
table.dataTable.table-sm .sorting_asc:after,
table.dataTable.table-sm .sorting_desc:after {
  top: 5px
}

table.table-bordered.dataTable td,
table.table-bordered.dataTable th {
  border-left-width: 0
}

table.table-bordered.dataTable td:last-child,
table.table-bordered.dataTable th:last-child {
  border-right-width: 0
}

table.table-bordered.dataTable tbody td,
table.table-bordered.dataTable tbody th {
  border-bottom-width: 0
}

div.dataTables_scrollHead table.table-bordered {
  border-bottom-width: 0
}

div.table-responsive>div.dataTables_wrapper>div.row {
  margin: 0
}

div.table-responsive>div.dataTables_wrapper>div.row>div[class^=col-]:first-child,
div.table-responsive>div.dataTables_wrapper>div.row>div[class^=col-]:last-child {
  padding-left: 0;
  padding-right: 0
}

@media screen and (max-width:576px) {
  .row-card-no-pd [class*=col-] .card:before {
    width: calc(100% - 30px) !important;
    right: 15px !important;
    height: 1px !important
  }

  .row-card-no-pd [class*=col-]:first-child .card:before {
    display: none !important
  }
}

@media screen and (min-width:991px) {

  .main-panel.full-height>.content,
  .main-panel.full-height>.content-full {
    margin-top: 0
  }

  .main-panel.full-height .navbar-header {
    min-height: 62px
  }

  .logo-header {
    line-height: 57px
  }

  .toggle-nav-search {
    display: none
  }

  #search-nav {
    display: block !important
  }

  .sidebar .scroll-element {
    opacity: 0;
    transition: all .2s
  }

  .sidebar:hover .scroll-element {
    opacity: 1
  }

  .sidebar[data-background-color]:before {
    background: rgba(255, 255, 255, .2) !important;
    z-index: 1000
  }
}

@media screen and (max-width:991px) {
  .main-header[data-background-color] .navbar-header {
    border-top: 1px solid rgba(0, 0, 0, .1)
  }



  .sidebar:before {
    background: 0 0
  }

  .nav_open .sidebar {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0) !important;
    border-right: 1px solid #f1f1f1
  }

  .sidebar .sidebar-wrapper {
    padding-top: 0
  }

  .sidebar .sidebar-wrapper .sidebar-content {
    padding-top: 0 !important
  }

  .sidebar .sidebar-wrapper .scroll-element.scroll-y {
    top: 0 !important
  }

  .nav_open {
    overflow: hidden !important
  }

  .nav_open .wrapper {
    overflow-x: hidden
  }

  .nav_open .main-header,
  .nav_open .main-panel {
    -webkit-transform: translate3d(250px, 0, 0);
    -moz-transform: translate3d(250px, 0, 0);
    -o-transform: translate3d(250px, 0, 0);
    -ms-transform: translate3d(250px, 0, 0);
    transform: translate3d(250px, 0, 0) !important
  }

  .quick_sidebar_open .quick-sidebar {
    width: 350px
  }

  .main-header {
    transition: all .5s
  }

  #search-nav {
    margin: 0 auto !important
  }

  .main-panel {
    width: 100%;
    transition: all .5s
  }

  .main-panel .page-header .dropdown-menu:after {
    right: 16px !important
  }

  .page-inner {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto
  }

  .page-sidebar {
    background: #fff
  }

  .logo-header {
    display: flex;
    width: 100% !important;
    text-align: left;
    position: relative;
    padding-left: 15px;
    padding-right: 15px
  }

  .logo-header .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
  }

  .logo-header .navbar-toggler {
    height: 100%;
    margin-left: 0 !important;
    opacity: 1;
    display: block;
    order: 1
  }

  .logo-header .more {
    opacity: 1;
    color: #545454;
    cursor: pointer;
    display: inline-block;
    line-height: 56px;
    order: 3;
    width: unset;
    margin-left: auto
  }

  .logo-header .navbar-brand {
    position: unset !important;
    margin-right: 0
  }

  .nav-search {
    width: 100%;
    margin-right: 0 !important
  }



  .topbar_open .navbar-header {
    transform: translate3d(0, 61px, 0) !important;
    padding: 6px
  }

  .topbar_open .navbar-header .navbar-nav>.nav-item .nav-link i {
    font-size: 19px
  }

  .topbar_open .navbar-header .navbar-nav>.nav-item:last-child .nav-link {
    padding: 0 !important
  }

  .topbar_open .navbar-header .navbar-nav>.nav-item:last-child .quick-sidebar-toggler {
    padding-left: 5px !important
  }

  .topbar_open .toggle-nav-search {
    display: list-item
  }

  .topbar_open #search-nav {
    text-align: center;
    width: 100%;
    padding: 10px 15px 0;
    order: 1
  }

  .topbar_open .main-panel {
    transform: translate3d(0, 62px, 0) !important
  }

  .topbar_open>.content {
    margin-top: 0 !important
  }

  .nav_open.topbar_open .main-panel {
    transform: translate3d(250px, 60px, 0) !important
  }

  .navbar-header .navbar-nav {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-left: 0 !important;
    position: relative
  }

  .navbar-header .navbar-nav .dropdown {
    position: unset
  }

  .navbar-header .navbar-nav .dropdown-menu {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 280px
  }

  .profile-pic span {
    display: none
  }

  .nav-toggle {
    display: none
  }

  .page-title {
    font-size: 18px
  }

  .card .card-title {
    font-size: 18px
  }

  .mail-wrapper .mail-option .email-filters-left {
    width: 50%
  }

  .mail-wrapper .mail-option .email-filters-left .btn-group {
    margin-bottom: 10px
  }

  .dropzone {
    padding: 20px 15px !important
  }

  .dropzone .dz-message .message {
    font-size: 23px
  }

  .dropzone .dz-message .note {
    font-size: 15px
  }
}

@media screen and (min-width:856px) {
  .mail-wrapper .aside-nav {
    display: block !important
  }
}

@media screen and (max-width:856px) {
  .mail-wrapper {
    flex-direction: column
  }

  .mail-wrapper .page-aside {
    width: 100%;
    height: unset;
    min-height: unset;
    border-bottom: 1px solid #eee;
    border-left: 0;
    border-right: 0;
    background: 0 0;
    padding-top: 0;
    padding-bottom: 0
  }

  .mail-wrapper .page-aside .aside-header {
    padding-top: 25px;
    padding-bottom: 25px;
    background: #f1f1f1
  }

  .mail-wrapper .page-aside .aside-nav {
    background: #fff;
    padding-top: 15px;
    padding-bottom: 15px
  }

  .mail-wrapper .mail-content {
    width: 100%
  }

  .mail-wrapper .mail-content .inbox-head {
    flex-direction: column;
    align-items: left
  }

  .mail-wrapper .mail-content .inbox-head h3 {
    font-size: 18px
  }

  .mail-wrapper .mail-content .inbox-head form {
    margin-left: 0 !important;
    margin-top: 15px
  }

  .mail-wrapper .mail-content .email-head h3 {
    font-size: 18px
  }

  .mail-wrapper .mail-content .email-compose-fields {
    padding: 20px 15px
  }

  .mail-wrapper .mail-option {
    flex-direction: column
  }

  .mail-wrapper .mail-option .email-filters-left {
    width: 100%;
    margin-bottom: 10px
  }

  .mail-wrapper .toggle-email-nav {
    display: inline-block !important
  }

  .mail-wrapper .table-inbox tr td .badge {
    margin-top: 5px;
    float: left
  }
}

@media screen and (max-width:767px) {
  .wizard-container {
    margin-left: 15px;
    margin-right: 15px
  }

  .main-panel .page-header {
    flex-direction: column;
    align-items: normal;
    position: relative;
    min-height: 43px;
    justify-content: center
  }

  .main-panel .page-header .breadcrumbs {
    margin-left: 0;
    padding-top: 15px;
    padding-left: 5px;
    padding-bottom: 0;
    border-left: 0
  }

  .main-panel .page-header .btn-group-page-header {
    position: absolute;
    right: 0
  }

  .footer .container-fluid {
    flex-direction: column
  }

  .footer .container-fluid .copyright {
    margin-left: 0 !important;
    margin-top: 10px;
    margin-bottom: 15px
  }
}

@media screen and (max-width:576px) {
  #chart-container {
    min-height: 250px
  }

  .form-check-inline {
    display: flex;
    flex-direction: column;
    align-items: left
  }

  #calendar .fc-toolbar {
    display: flex;
    flex-direction: column
  }

  #calendar .fc-toolbar .fc-center,
  #calendar .fc-toolbar .fc-left,
  #calendar .fc-toolbar .fc-right {
    margin: auto;
    margin-bottom: 15px
  }

  #calendar .fc-toolbar .fc-left {
    order: 1
  }

  #calendar .fc-toolbar .fc-right {
    order: 3
  }

  #calendar .fc-toolbar .fc-center {
    order: 2
  }

  .conversations .conversations-body {
    padding: 1.5rem 1rem
  }
}

@media screen and (max-width:350px) {
  .quick_sidebar_open .quick-sidebar {
    width: 100%;
    padding: 20px
  }
}

body {
  background: #f9fbfd
}

body[data-background-color=bg1] {
  background: #f9fbfd
}

body[data-background-color=bg2] {
  background: #fff
}

body[data-background-color=bg3] {
  background: #f1f1f1
}

body[data-background-color=dark] {
  background: #1a2035
}

body[data-background-color=dark] .main-header {
  box-shadow: 0 0 5px #121727
}

body[data-background-color=dark] .main-panel {
  color: rgba(169, 175, 187, .82) !important
}

body[data-background-color=dark] .main-panel label {
  color: #fff !important
}

body[data-background-color=dark] .card,
body[data-background-color=dark] .list-group-item,
body[data-background-color=dark] .row-card-no-pd,
body[data-background-color=dark] .timeline>li>.timeline-panel {
  background: #202940
}

body[data-background-color=dark] .card-pricing2 {
  background: #202940 !important
}

body[data-background-color=dark] .row-card-no-pd [class*=col] .card:before {
  background: rgba(181, 181, 181, .1) !important
}

body[data-background-color=dark] .breadcrumbs,
body[data-background-color=dark] .card .card-action,
body[data-background-color=dark] .card .card-footer,
body[data-background-color=dark] .card .card-header,
body[data-background-color=dark] .card-profile .user-stats [class^=col],
body[data-background-color=dark] .conversations .messages-form,
body[data-background-color=dark] .list-group .list-group-item,
body[data-background-color=dark] .mail-wrapper .mail-content .email-head,
body[data-background-color=dark] .mail-wrapper .mail-content .email-sender,
body[data-background-color=dark] .mail-wrapper .mail-content .inbox-body .email-list .email-list-item,
body[data-background-color=dark] .main-panel .page-divider,
body[data-background-color=dark] .page-with-aside .page-aside,
body[data-background-color=dark] .separator-dashed,
body[data-background-color=dark] .separator-dot,
body[data-background-color=dark] .separator-solid,
body[data-background-color=dark] .table td,
body[data-background-color=dark] .table th,
body[data-background-color=dark] .timeline>li>.timeline-panel {
  border-color: rgba(181, 181, 181, .1) !important
}

body[data-background-color=dark] .timeline>li>.timeline-panel:before {
  border-left-color: rgba(181, 181, 181, .1);
  border-right-color: rgba(181, 181, 181, .1)
}

body[data-background-color=dark] .timeline>li>.timeline-panel:after {
  border-left-color: #202940;
  border-right-color: #202940
}

body[data-background-color=dark] .breadcrumbs li a,
body[data-background-color=dark] .page-title {
  color: rgba(169, 175, 187, .82)
}

body[data-background-color=dark] .page-category {
  color: #828282
}

body[data-background-color=dark] .card-title,
body[data-background-color=dark] .card-title a,
body[data-background-color=dark] .card-title a:focus,
body[data-background-color=dark] .card-title a:hover {
  color: #fff
}

body[data-background-color=dark] .card-category {
  color: #8b92a9
}

body[data-background-color=dark] .card-danger,
body[data-background-color=dark] .card-default,
body[data-background-color=dark] .card-info,
body[data-background-color=dark] .card-primary,
body[data-background-color=dark] .card-secondary,
body[data-background-color=dark] .card-success,
body[data-background-color=dark] .card-warning {
  color: #fff
}

body[data-background-color=dark] .card-danger .card-category,
body[data-background-color=dark] .card-danger .card-title,
body[data-background-color=dark] .card-default .card-category,
body[data-background-color=dark] .card-default .card-title,
body[data-background-color=dark] .card-info .card-category,
body[data-background-color=dark] .card-info .card-title,
body[data-background-color=dark] .card-primary .card-category,
body[data-background-color=dark] .card-primary .card-title,
body[data-background-color=dark] .card-secondary .card-category,
body[data-background-color=dark] .card-secondary .card-title,
body[data-background-color=dark] .card-success .card-category,
body[data-background-color=dark] .card-success .card-title,
body[data-background-color=dark] .card-warning .card-category,
body[data-background-color=dark] .card-warning .card-title {
  color: #fff
}

body[data-background-color=dark] .nav-pills .nav-link:not(.active) {
  background: #fff
}

body[data-background-color=dark] .card-pricing .specification-list li {
  border-color: #373d4c
}

body[data-background-color=dark] .input-group-text {
  border-color: #2f374b !important;
  background-color: #1f283e;
  color: #fff
}

body[data-background-color=dark] .input-solid {
  background: #363b4c !important;
  border-color: #363b4c !important
}

body[data-background-color=dark] .list-group .list-group-item-text,
body[data-background-color=dark] .list-group-messages .list-group-item-title a {
  color: inherit
}

body[data-background-color=dark] .footer {
  border-top: 1px solid #293247;
  background: #1f283e
}

body[data-background-color=dark] .form-control,
body[data-background-color=dark] .form-group-default,
body[data-background-color=dark] .select2-container--bootstrap .select2-selection {
  background-color: #1a2035;
  color: #fff;
  border-color: #2f374b
}

body[data-background-color=dark] .bootstrap-tagsinput {
  background: 0 0
}

body[data-background-color=dark] .selectgroup-button {
  border: 1px solid #2f374b
}

body[data-background-color=dark] .conversations .message-header {
  background: #1a2035;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .07)
}

body[data-background-color=dark] .conversations .conversations-content {
  color: #575962;
  border-color: #2e364a
}

body[data-background-color=dark] .mail-wrapper .mail-content .inbox-body .email-list .email-list-item.unread {
  background: #1f283e !important
}

body[data-background-color=dark] .mail-wrapper .mail-content .inbox-body .email-list .email-list-item:hover {
  background: #171e2f !important
}

body[data-background-color=dark] .page-with-aside .page-aside .aside-nav .nav>li.active,
body[data-background-color=dark] .page-with-aside .page-aside .aside-nav .nav>li:focus,
body[data-background-color=dark] .page-with-aside .page-aside .aside-nav .nav>li:hover {
  background: rgba(0, 0, 0, .03)
}

body[data-background-color=dark] .page-with-aside .page-aside .aside-nav .nav>li.active>a {
  color: #b9babf !important
}

body[data-background-color=dark] .board {
  color: #575962
}

.bg-dark {
  background-color: #1a2035 !important
}

.bg-dark2 {
  background-color: #1f283e !important
}

.bg-primary {
  background-color: #1572e8 !important
}

.bg-primary2 {
  background-color: #1269db !important
}

.bg-secondary {
  background-color: #6861ce !important
}

.bg-secondary2 {
  background-color: #5c55bf !important
}

.bg-info {
  background-color: #48abf7 !important
}

.bg-info2 {
  background-color: #3697e1 !important
}

.bg-success {
  background-color: #31ce36 !important
}

.bg-success2 {
  background-color: #2bb930 !important
}

.bg-warning {
  background-color: #ffad46 !important
}

.bg-warning2 {
  background-color: #ff9e27 !important
}

.bg-danger {
  background-color: #f25961 !important
}

.bg-danger2 {
  background-color: #ea4d56 !important
}

.bg-grey1 {
  background: #f9fbfd !important
}

.bg-grey2 {
  background: #f1f1f1
}

.bg-dark-gradient {
  background: #1f283e !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #0a0b11, #1f283e) !important;
  background: linear-gradient(-45deg, #0a0b11, #1f283e) !important
}

.bg-primary-gradient {
  background: #1572e8 !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #06418e, #1572e8) !important;
  background: linear-gradient(-45deg, #06418e, #1572e8) !important
}

.bg-secondary-gradient {
  background: #6861ce !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #2a20ac, #6861ce) !important;
  background: linear-gradient(-45deg, #2a20ac, #6861ce) !important
}

.bg-info-gradient {
  background: #48abf7 !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #0a5a97, #48abf7) !important;
  background: linear-gradient(-45deg, #0a5a97, #48abf7) !important
}

.bg-success-gradient {
  background: #31ce36 !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #179d08, #31ce36) !important;
  background: linear-gradient(-45deg, #179d08, #31ce36) !important
}

.bg-warning-gradient {
  background: #ffad46 !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #e1810b, #ffad46) !important;
  background: linear-gradient(-45deg, #e1810b, #ffad46) !important
}

.bg-danger-gradient {
  background: #f25961 !important;
  background: -webkit-linear-gradient(legacy-direction(-45deg), #e80a15, #f25961) !important;
  background: linear-gradient(-45deg, #e80a15, #f25961) !important
}
`}</style>
    </>

  )
}