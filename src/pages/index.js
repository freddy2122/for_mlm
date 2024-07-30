import React, { useEffect, useState } from 'react';
import logo from '../Logo__1_-removebg-preview.png';
import '../css/App.css';
import { Link } from 'react-router-dom';
import { isAuthenticated, removeAuthToken } from '../api/auth-provider';
import { useCartContext } from '../api/provider';


const FirstTimePage = () => {
  const { userData } = useCartContext();
  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/account/login';
  };
  return (
    <div class="container-fluid position-relative" style={{ minHeight: '100vh', backgroundColor: '#fec045' }}>
      <div className='text-right p-5' style={{ right: 30, top: 30 }}>
        <Link to={'/account/login'} class="btn btn-secondary btn-lg px-4 me-md-2 fw-bold border-white shadow-md" style={{ borderRadius: '20px', }}>Connexion</Link>
      </div>
      <div class="row p-4 pb-0 pe-lg-0 align-items-center">
        <div class="col-lg-5">
          <h2 class="mb-0 text-white mb-2" style={{ fontWeight: 'bold' }}>FOR MLM</h2>
          <h1 class="fw-bold text-body-emphasis text-primary index-text" style={{ lineHeight: 0.8 }}>Restons connectés</h1>
          <p class="mb-0 text-white fs-5">Rejoignez tous vos stockistes partout dans le monde</p>
          <p class="mb-0 text-white fs-5">Retrouvez tous vos produits Longrich en un clin d'œil</p>
          <p class="mb-0 text-white fs-5">Faites livrer vos clients en un éclair aux quatre coins du monde</p>
          <p class="mb-0 text-white fs-5">Facilitez l’adhésion de vos nouveaux filleuls partout dans le monde</p>
          <p class="mb-0 text-white fs-5">Accélérez vos ventes et votre chiffre d’affaire le plus rapidement possible</p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start my-4 mb-lg-3">
            <Link to={'/welcome'} type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold border-white shadow-md" style={{ borderRadius: '20px' }}>COMMENCEZ ICI</Link>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <h1 type="button" class="text-white">100 % gratuit</h1>
          </div>
        </div>
        <div class="col-12 col-sm-8 col-lg-6 offset-lg-1">
          <img class="d-block mx-lg-auto img-fluid" src="/img/index.png" alt="" width="600" height="400" />
        </div>
      </div>
    </div>
  );
};

export default FirstTimePage;
