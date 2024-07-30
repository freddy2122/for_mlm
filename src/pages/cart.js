import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../api/provider";
import NumberFormatter from "../dashboard/number-format";
import { API_PATH, UPLOADS_PATH } from "../api/vars";
import { getAuthToken } from "../api/auth-provider";
import Loader from '../components/loader';

export default function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, calculateProductTotal, calculateTotalPrice, userData } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const items = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      shop_id: item.shop_id,
      price: item.price,
    }));

    const cartData = {
      customerId: userData?.id,
      customerEmail: userData?.email,
      cartItems: items,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_PATH}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        localStorage.removeItem("ForMLMCartItems");
        window.location.href = '/confirmation';
        console.log('Données envoyées avec succès !');
        setIsLoading(false);
      } else {
        console.error('Erreur lors de l\'envoi des données à l\'API');
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API :', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand font-bold text-dark" to="/welcome">
            <img src="/img/Logo__1_-removebg-preview.png" width="50" height="50" alt="ForMLM" />
          </Link>
          <form className="d-flex">
            <Link to="/welcome" className="btn btn-outline-primary">
              Retour à la boutique
            </Link>
          </form>
        </div>
      </nav>

      <section className="py-5" style={{ minHeight: '80vh' }}>
        <div className="container">
          <div className="row">
            {/* cart */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Votre panier d'achat</h4>
                  {cartItems.map((cartItem, index) => (
                    <div className="row gy-3" key={index}>
                      <div className="col-lg-5">
                        <div className="me-lg-5">
                          <div className="d-flex">
                            <img
                              src={cartItem.img ? UPLOADS_PATH + cartItem.img : '/img/Huile-de-massage-Eveil-sensuel-300x300_300x.avif'}
                              className="border rounded me-3"
                              style={{ width: 96, height: 96 }}
                            />
                            <div className="">
                              <a href="#" className="nav-link">
                                {cartItem.libelle}
                              </a>
                              <p className="text-muted ml-3" style={{ lineClamp: 1 }}>{cartItem.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="mr-2">
                          <div className="input-group quantity" style={{ width: '100px' }}>
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-primary btn-minus rounded-0" onClick={() => decreaseQuantity(cartItem)}>
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <input type="text" className="form-control form-control-sm bg-light rounded-0 text-center" value={cartItem.quantity} />
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-primary btn-plus rounded-0" onClick={() => increaseQuantity(cartItem)}>
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="h6 mb-0 pb-0"><NumberFormatter number={(calculateProductTotal(cartItem))} /> FCFA</div> <br />
                          <small className="text-muted text-nowrap">
                            {" "}
                            <NumberFormatter number={cartItem.price} /> FCFA / par article{" "}
                          </small>
                        </div>
                      </div>
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                          <a
                            onClick={() => handleRemoveFromCart(cartItem)}
                            className="btn btn-light border text-danger icon-hover-danger"
                          >
                            {" "}
                            Enlever
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg" />  Livraison gratuite dans un délai de 1 à 2 semaines
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            {/* cart */}
            {/* summary */}
            <div className="col-lg-3">
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Prix total HT :</p>
                    <p className="mb-2"><NumberFormatter number={calculateTotalPrice()} /> FCFA</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">TVA :</p>
                    <p className="mb-2"><NumberFormatter number={0} /> FCFA</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Prix total TTC :</p>
                    <p className="mb-2 fw-bold"><NumberFormatter number={calculateTotalPrice()} /> FCFA </p>
                  </div>
                  <div className="mt-3">
                    <form onSubmit={handleFormSubmit}>
                      <button type="submit" className="btn btn-success w-100 shadow-0 mb-2">
                        Effectuer l'achat
                      </button>
                    </form>
                    <Link to="/recherche-de-produits" className="btn btn-light w-100 border mt-2">
                      {" "}
                      Retour à la boutique{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* summary */}
          </div>
        </div>
      </section>

      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © Your Website 2023
          </p>
        </div>
      </footer>
    </div>
  )
}
