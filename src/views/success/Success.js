import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {

  return (
    <section className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
      <div className="px-4 py-5 my-5 text-center">
        <img className="d-block mx-auto mb-4" src="/img/Logo__1_-removebg-preview.png" alt="" width="124" height="124" />
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Votre commande a été correctement envoyée. Vous recevrez bientôt un courriel de confirmation.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to={'/recherche-de-produits'} className="btn btn-primary px-4 gap-3">Retour à la boutique</Link>
          </div>
        </div>
      </div>
    </section>
  )
}