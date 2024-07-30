import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartContext } from "../../api/provider";
import { API_PATH, UPLOADS_PATH } from "../../api/vars";
import NumberFormatter from "../../dashboard/number-format";
import { isAuthenticated } from "../../api/auth-provider";
import Footer from "./components/footer";

export default function ProductDetails() {
  const { slug } = useParams();
  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const boutiqueName = urlParts[3];

  const { cartItems, addToCart, userData } = useCartContext();
  const totalItemsInCart = cartItems.length;
  const [activeImage, setActiveImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [isShopProduct, setIsShopProduct] = useState([]);
  const [isShop, setIsShop] = useState([]);

  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const get_user_response = await fetch(`${API_PATH}/shop_show/${boutiqueName}`, {
          method: 'GET',
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          setIsShop(get_user_data.boutique);
          setIsShopProduct(get_user_data.boutique.products);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, [boutiqueName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_PATH}/products/${slug}`);
        const data = await response.json();
        setProduct(data.product);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    document.title = `Produit - FORMLM`;
  }, []);

  const incrementQuantity = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleAddToCart = (data) => {
    const productToAdd = {
      ...data,
      quantity: selectedQuantity || 1,
      shop_id: isShop.id,
    };
    addToCart(productToAdd);
    setShowAlert(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand font-bold text-dark" to="/welcome">
            <img src="/img/Logo__1_-removebg-preview.png" width="40" height="40" alt="ForMLM" />
          </Link>
          <form className="d-flex">
            {userData.type_account === 'stockist' ? (
              <Link to="/store-manager" className="btn btn-outline-primary">
                Retour au tableau de bord
              </Link>
            ) : (
              <Link to="/cart" className="btn btn-outline-primary">
                <i className="bi-cart-fill me-1" />
                Cart
                <span className="badge bg-primary text-white ml-2 rounded-pill">
                  {totalItemsInCart}
                </span>
              </Link>
            )}
          </form>
        </div>
      </nav>
      {/* Product section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0 border"
                src={product.img ? `http://app.formlm.biz${product.img}` : '/img/Huile-de-massage-Eveil-sensuel-300x300_300x.avif'}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">{product?.libelle}</div>
              <h1 className="display-5 fw-bolder">{isShop.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through"><NumberFormatter number={product?.price} /> FCFA</span>
              </div>
              <p className="lead">
                {product?.description}
              </p>
              {product.type && (
                <div>
                  <p className="tag-section">
                    <strong>Tag : </strong>
                    <span>{product.type}</span>
                  </p>
                </div>
              )}
              <div className="d-flex">
                <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus" onClick={decrementQuantity}>
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input type="text" className="form-control bg-light text-center" value={selectedQuantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value))} />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus" onClick={incrementQuantity}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-outline-primary flex-shrink-0"
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="bi-cart-fill me-1" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related items section*/}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Vous pourriez également apprécier</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {isShopProduct.slice(0, 4).map((item, index) => (
              <div className="col mb-5" key={index}>
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img className="img-fluid w-100" style={{ height: '280px' }} src={item.img ? `http://app.formlm${item.img}` : '/img/Huile-de-massage-Eveil-sensuel-300x300_300x.avif'} alt="" />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{item.libelle}</h6>
                    <div className="d-flex justify-content-center">
                      <h6 className='text-truncate'><NumberFormatter number={item.price} /> FCFA</h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link to={`/${isShop.slug}/detail/${item.slug}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>Détail</Link>
                    <button className="btn btn-sm text-dark p-0" onClick={() => handleAddToCart(item)}><i className="fas fa-shopping-cart text-primary mr-1"></i>Panier</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © Your Website 2023
          </p>
        </div>
      </footer>
    </div>
  );
}
