import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard/layout/dashboard-layout'
import UserInfos from '../../dashboard/components/user'
import { getAuthToken, isAuthenticated } from '../../api/auth-provider';
import { useCartContext } from '../../api/provider';
import { API_PATH } from '../../api/vars';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Loader from '../../components/loader';

export default function GestionStock() {
  const { features, userData } = useCartContext();
  const [nameFilter, setNameFilter] = useState('');
  const [filteredFeatures, setFilteredFeatures] = useState(features);
  const [currentPage, setCurrentPage] = useState(1);
  const [productAdded, setProductAdded] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [isShop, setIsShop] = useState([]);
  const [add, setAdd] = useState(0);
  const [loading, setLoading] = useState(false);


  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  useEffect(() => {
    if (userData?.type_account === 'stockist') {

    } else {
      window.location.href = '/recherche-de-produits';

    }
  }, [userData]);
  var settings = {
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    async function fetchData() {
      try {

        const get_user_response = await fetch(`${API_PATH}/shop_show/${userData?.shop.slug}`, {
          method: 'GET',
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          setIsShop(get_user_data.boutique.products)
          // console.log('Données récupérées avec succès :', isShop);
        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);

        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, []);



  useEffect(() => {
    const filtered = features.filter(feature => {
      const lowerName = feature.libelle ? feature.libelle.toLowerCase() : '';
      return (
        (!nameFilter || lowerName.includes(nameFilter.toLowerCase()))
      );
    });
    setFilteredFeatures(filtered);
  }, [features, nameFilter]);



  const isUserProduct = (productId) => {
    return isShop.some((userProduct) => userProduct.id === productId);
  };

  const handleAddProduct = (item) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    };

    const requestBody = {
      product_id: item.id,
      shop_id: userData.shop.id,
    };

    // Définissez l'état de chargement sur true au début de la requête
    setLoading(true);

    fetch(`${API_PATH}/add-products`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Erreur lors de l\'ajout du produit');
        }
      })
      .then((data) => {
        setTimeout(() => {
          setProductAdded('Produit ajouté avec succès');
        }, 200);

        setAddedProducts([...addedProducts, item.id])
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      })
      .finally(() => {
        // Réinitialisez l'état de chargement à false après la requête
        setLoading(false);
      });
  };


  const handleRemoveProduct = (item) => {

    setLoading(true);
    // Effectuez une requête DELETE pour supprimer le produit du backend
    fetch(`${API_PATH}/delete/${userData?.shop.id}/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            setProductAdded('Produit retirer avec succès');
          }, 200);
          // Supprimez le produit de la liste locale
          setAddedProducts((addedProducts) => addedProducts.filter(product => String(product.id) !== String(item.id)));
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit :', error);
      }).finally(() => {
        // Réinitialisez l'état de chargement à false après la requête
        setLoading(false);
      });
  };
  // console.log(addedProducts)
  return (
    <>
      {loading && <Loader />}
      <DashboardLayout>
        <div className="row mt--2">

          <UserInfos />
          <div className="col-md-8">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Gestion du stock</div>
                  <div className="card-tools">
                    <div className="form-group px-0">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-search" />
                          </span>
                        </div>
                        <input type="text" className="form-control" placeholder="" value={nameFilter} onChange={e => setNameFilter(e.target.value)} aria-describedby="basic-addon1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className='row'>
                  <div className="selectgroup w-100 px-3" style={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'thin' }}>
                    <div className={`selectgroup-item ${add === 0 ? 'bg-primary' : ''}`} onClick={() => { setFilteredFeatures(features); setAdd(0) }}>
                      <span className={`selectgroup-button ${add === 0 && 'text-white'}`}>Tous</span>
                    </div>
                    <div
                      className={`selectgroup-item ${add === 1 ? 'bg-primary' : ''}`}
                      onClick={() => {
                        setFilteredFeatures(features.filter(item => isUserProduct(item.id)));
                        setAdd(1);
                      }}
                    >
                      <span className={`selectgroup-button ${add === 1 && 'text-white'}`}>Articles ajoutés</span>
                    </div>
                    <div
                      className={`selectgroup-item ${add === 2 ? 'bg-primary' : ''}`}
                      onClick={() => {
                        setFilteredFeatures(features.filter(item => !addedProducts.includes(item.id) && !isUserProduct(item.id)));
                        setAdd(2);
                      }}
                    >
                      <span className={`selectgroup-button ${add === 2 && 'text-white'}`}>Articles non ajoutés</span>
                    </div>
                  </div>


                </div>

                {userData.shop ?
                  <div className="album bg-body-tertiary my-4">
                    <Slider {...settings} >
                      {filteredFeatures.map((item, index) => (
                        <div className="col" key={index}>
                          <div className="card rounded-lg">

                            <img src="/img/Huile-de-massage-Eveil-sensuel-300x300_300x.avif" className="card-img-top" alt="..." />
                            <div className="card-body px-1">
                              <h6 className="text-truncate mb-3">{item.libelle}</h6>
                              <div className="">
                                {!addedProducts.includes(item.id) && !isUserProduct(item.id) ?
                                  <button type='submit' onClick={() => handleAddProduct(item)} className="btn btn-success btn-sm rounded-lg w-100">Ajouter</button>
                                  :
                                  <button type='submit' onClick={() => handleRemoveProduct(item)} className="btn btn-danger btn-sm rounded-lg w-100">Retirer</button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  :
                  <div className="col-md-12">
                    <div className="card card-info card-annoucement card-round">
                      <div className="card-body text-center">
                        <div className="card-opening">Vous n'avez pas de boutique</div>
                        <div className="card-desc">
                          Veuillez créer une boutique pour pouvoir accéder au panneau.
                        </div>
                        <div className="card-detail">
                          <Link to='/store-manager' className="btn btn-light btn-rounded">Créer une boutique</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <>
                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Ajouter un produit
                  </button>
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Ajouter un produit
                          </h1>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">
                                Nom du produit:
                              </label>
                              <input type="text" className="form-control" id="recipient-name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">
                                Prix du produit:
                              </label>
                              <input type="number" min={0} className="form-control" id="recipient-name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">
                                Image:
                              </label>
                              <input type="file" className="form-control" id="recipient-name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="message-text" className="col-form-label">
                                Description:
                              </label>
                              <textarea className="form-control" id="message-text" defaultValue={""} />
                            </div>
                          </form>

                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Fermer
                          </button>
                          <button type="button" className="btn btn-primary btn-sm">
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

              </div>

            </div>
          </div>
        </div>
      </DashboardLayout>
      {productAdded && (
        <div className="account-alert">
          <div className="alert alert-success bg-white">
            <button type="button" className="btn btn-success btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setProductAdded(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>{productAdded}</p>
          </div>
        </div>
      )}
    </>

  )
}