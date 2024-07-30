import { Fragment, useEffect, useState } from 'react';
import { useCartContext } from '../../api/provider';
import '../../css/index.css';
import { Link, useParams } from 'react-router-dom';
import { API_PATH, UPLOADS_PATH } from '../../api/vars';
import NumberFormatter from "../../dashboard/number-format";
import { getAuthToken, isAuthenticated } from '../../api/auth-provider';
import UserDashboardLayout from '../../dashboard/layout/user-simple-layout';

function AddProducts() {
  const { cartItems, categoriesData, addToCart, features } = useCartContext();
  const { userData } = useCartContext();
  const { slug } = useParams();
  const totalItemsInCart = cartItems.length;
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShop, setIsShop] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [productAdded, setProductAdded] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [add, setAdd] = useState();

  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  useEffect(() => {
    if (userData?.type_account === 'stockist') {

    } else {
      window.location.href = '/recherche-de-produits';

    }
  }, [userData]);


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


  const handleAddProduct = (item) => {

    if (addedProducts.includes(item.id)) {
      setProductAdded('Ce produit a déjà été ajouté à la boutique.');
    } else {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      };

      const requestBody = {
        product_id: item.id,
        shop_id: userData.shop.id,
      };

      fetch(`${API_PATH}/add-products`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.status === 200) {
            // window.location.reload();
            setAddedProducts([...addedProducts, item.id]);
            return response.json();
          } else {
            throw new Error('Erreur lors de l\'ajout du produit');
          }
        })
        .then((data) => {
          setProductAdded('Produit ajouté avec succès');
          setAdd(item.id)
          // console.log(add)
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
        });

    }
  };



  const handleRemoveProduct = (item) => {
    // Effectuez une requête DELETE pour supprimer le produit du backend
    fetch(`${API_PATH}/delete/${item.slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`, // Assurez-vous d'envoyer un jeton d'authentification si nécessaire
      },
    })
      .then((response) => {
        if (response.ok) {
          // Supprimez le produit de la liste locale
          setAddedProducts(addedProducts.filter(product => product.id !== item.id));
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit :', error);
      });
  };


  let produitsCategorieCible = [];

  // if (isShop && isShop.products) {
  produitsCategorieCible = features.filter((produit) => {
      return (
        (selectedCategory === 0 || produit.category_id === selectedCategory) &&
        (searchQuery === "" || produit.libelle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  // } else {
  //   // Gérez le cas où isShop ou isShop.products n'est pas défini ou est vide
  // }


  const totalPages = Math.ceil(produitsCategorieCible.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = produitsCategorieCible.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleCategoryChange = (event) => {
    setSelectedCategory(event);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    document.title = 'Profile - ForMLM ';
  }, []);
  return (
    <UserDashboardLayout>
      {showAlert && (
        <div className="account-alert" style={{ zIndex: '10' }}>
          <div className="alert alert-success bg-white">
            <button type="button" className="btn btn-success btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setShowAlert(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>Produit ajouté avec succès.</p>
          </div>
        </div>
      )}
      <div className="container-fluid border-bottom bg-white">
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 col-md-3 col-sm-2 d-lg-flex col-6">
            <Link to={userData.type_account === 'stockist' ? '/store-manager' : '/recherche-de-produits'} className="text-decoration-none">
              <img src="/img/Logo__1_-removebg-preview.png" className="img-fluid" width={100} />
            </Link>
          </div>


          <div className="col-lg-5 col-md-6 col-sm-8 col-6 text-left navbar-search">
            <form action="">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Rechercher par nom"
                  value={searchQuery}
                  onChange={handleSearchChange} />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <div className="dropdown">
                      <div className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                      </div>

                      <ul className="dropdown-menu">
                        <li onClick={() => handleCategoryChange(0)}><a className="dropdown-item cursor-pointer text-uppercase">Toutes les catégories</a></li>
                        {categoriesData.map((item, index) => (<li key={index} onClick={() => handleCategoryChange(item.id)}><a className="dropdown-item cursor-pointer">{item.libelle}</a></li>))}
                      </ul>
                    </div>

                  </span>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>


          <div className="col-lg-4 col-6 text-right navbar-auth">
            <Link to="/store-manager" className="btn border ml-2">
              <i className="fas fa-home text-primary"></i>
              <span className="badge" style={{ color: '#6F6F6F' }}>Retour au tableau de bord</span>
            </Link>
          </div>

          <div className="col-md-3 col-6 col-sm-2 text-end navbar-list" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <button className="btn border">
              <i className="fas fa-list text-primary"></i>
            </button>
          </div>
        </div>
      </div>


      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5"><span className="px-2">{visibleProducts.length > 0 ? 'Découvrez la sélection du jour' : 'Désolé aucun produit n\'est disponible'}</span></h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {visibleProducts.length > 0 ?

            <Fragment>
              {visibleProducts.map((item, index) => (
                <div className="col-lg-2 col-md-4 col-6 pb-1" key={index}>
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img className="img-fluid w-100" style={{ height: '280px' }} src={item.img ? 'http://app.formlm' + item.img : '/img/Huile-de-massage-Eveil-sensuel-300x300_300x.avif'} alt="" />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                      <h6 className="text-truncate mb-3">{item.libelle}</h6>
                      <div className="d-flex justify-content-center">
                        <h6 className='text-truncate'><NumberFormatter number={item.price} /> FCFA</h6>
                        {/* <h6 className="text-muted ml-2 text-truncate"><del><NumberFormatter number={item.price} /> FCFA</del></h6> */}
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">

                      {addedProducts.includes(item.id) ? (
                        <button type='submit' onClick={() => handleRemoveProduct(item)} className="btn btn-danger btn-sm rounded-lg w-100">Retirer</button>
                      ) : (
                          <button type='submit' onClick={() => handleAddProduct(item)} className="btn btn-success btn-sm rounded-lg w-100">Ajouter</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12 pb-1">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className={`page-item cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}>
                      <span className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        &laquo; Précédent
                      </span>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <span className={`page-link cursor-pointer ${currentPage === index + 1 && 'active'}`}
                          onClick={
                            () => handlePageChange(index + 1)
                          } >
                          {index + 1}
                        </span>
                      </li>
                    ))}
                    <li className={`page-item cursor-pointer ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <span className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        Suivant &raquo;
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </Fragment>
            :
            null
          }

        </div>
      </div>


      <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">For MLM</h5>
          <button className="btn border" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="fas fa-times text-primary"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <form action="">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Rechercher..." />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-primary">
                  <div className="dropdown">
                    <div className="dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categories
                    </div>

                    <ul className="dropdown-menu">
                      <li onClick={() => handleCategoryChange(0)}><a className="dropdown-item cursor-pointer text-uppercase">Toutes les catégories</a></li>
                      {categoriesData.map((item, index) => (<li key={index} onClick={() => handleCategoryChange(item.id)}><a className="dropdown-item cursor-pointer">{item.libelle}</a></li>))}
                    </ul>
                  </div>

                </span>
              </div>
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>


          {userData.type_account === 'stockist' ?
            <div className="my-5">
              <Link to="/store-manager" className="btn border d-block my-2">
                <i className="fas fa-home text-primary"></i>
                <span className="badge" style={{ color: '#6F6F6F' }}>Retour au tableau de bord</span>
              </Link>
            </div>
            :
            <div className="my-5">


              <Link to="/recherche-de-stockiste" className="btn border d-block my-2">
                <i className="fas fa-search text-primary"></i>
                <span className="badge" style={{ color: '#6F6F6F' }}>Rechercher un stockiste</span>
              </Link>

              <Link to="/recherche-de-produits" className="btn border d-block my-2">
                <i className="fas fa-search text-primary"></i>
                <span className="badge" style={{ color: '#6F6F6F' }}>Rechercher un produits</span>
              </Link>



              <Link to="/cart" className="btn border d-block my-2">
                <i className="fas fa-shopping-cart text-primary"></i>
                <span className="badge" style={{ color: '#6F6F6F' }}>{totalItemsInCart}</span>
              </Link>
            </div>
          }
        </div>
      </div>
    </UserDashboardLayout>
  );
}

export default AddProducts;
