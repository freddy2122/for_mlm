import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_PATH } from '../../api/vars';
import { getAuthToken, isAuthenticated } from "../../api/auth-provider";
import FindNavBar from "./components/nav-bar";
import '../../css/atlantis.min.css';
import '../../css/bootstrap.min.css';
import { useCartContext } from '../../api/provider';
import Footer from "./components/footer";
import UserDashboardLayout from "../../dashboard/layout/user-simple-layout";


const columns = [
  { key: 'col1', label: 'Nom du produit' },
  { key: 'col2', label: 'Boutique' },
  { key: 'col3', label: 'Localisation' },
];

export default function ProductsSearch() {

  const { userData } = useCartContext();
  const [getUserData, setGetUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(getUserData);


  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  useEffect(() => {
    if (userData?.type_account === 'stockist') {
      window.location.href = '/store-manager';

    } else {

    }
  }, [userData]);


  useEffect(() => {
    async function fetchData() {
      try {

        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };

        const get_user_response = await fetch(`${API_PATH}/shop_all`, {
          method: 'GET',
          headers: headers,
        });

        if (get_user_response.status === 200) {
          const get_user_data = await get_user_response.json();
          // console.log('Données récupérées avec succès :', get_user_data.boutiques);
          setGetUserData(get_user_data.boutiques)

        } else {
          console.error('Erreur lors de la récupération des données :', get_user_response.status);

        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, []);

  const getUserDataMap = getUserData
    .flatMap((rows) =>
      rows.products.map((row) => ({
        col1: row.libelle,
        col2: rows.name,
        col3: `${rows.country} - ${rows.city}`,
        phone: rows.phone,
        email: rows.email,
        whatsapp: rows.whatsapp,
        slug: row.slug,
        shop: rows.slug,
      })
      )
    )


  useEffect(() => {
    // Filtrer les données en fonction de la recherche
    const filtered = getUserDataMap
      .filter((row) =>
        columns.some((col) =>
          String(row[col.key]).toLowerCase().includes(searchValue.toLowerCase())
        )
      );

    setFilteredData(filtered);
  }, [searchValue, getUserData, columns]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const totalEntries = filteredData.length;


  return (
    <UserDashboardLayout>

      {/* <FindNavBar /> */}

      <div className="py-3">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Recherche de produits</h4>
          </div>



          <div className="card-body">
            <div className="table-responsive">
              <div className="input-group mb-3">
                <span className="input-group-text rounded-0" id="basic-addon1">
                  <i className="fas fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Effectuer une recherche en utilisant le nom d'un pays, d'une ville ou d'un quartier"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              
              <table className="display table table-striped table-hover">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </tfoot>
                <tbody>

                  {currentData.length > 0 ?

                    currentData.map((row, index) => (
                      <tr key={index}>
                        {columns.map((col) => (
                          <td key={col.key}>{row[col.key]}</td>
                        ))}
                        <td>
                          <div className="form-button-action">
                            {/* {row.phone &&
                              <Link to={`tel:${row.phone}`} target="_blank" className="btn btn-success border rounded-circle mr-xl-1">
                                <i className="bi bi-telephone-fill"></i>
                              </Link>
                            } */}

                            {row.email &&
                              <Link to={`mailto:${row.email}`} target="_blank" className="btn btn-success border rounded-circle mr-xl-1">
                                <i className="bi bi-envelope-fill"></i>
                              </Link>
                            }

                            {/* {row.whatsapp &&
                              <Link to={`https://wa.me/${row.whatsapp}?text=Bonjour, je suis intéressé(e) par votre boutique.`} target="_blank" className="btn btn-success border rounded-circle mr-xl-1">
                                <i className="bi bi-whatsapp"></i>
                              </Link>
                            } */}
                            {row.shop && row.slug &&
                              <Link to={`/${row.shop}/detail/${row.slug}`} className="btn btn-secondary border rounded-circle">
                                <i className="bi bi-eye-fill"></i>
                              </Link>
                            }
                          </div>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td colspan="4" className="text-center">Aucun produit trouvé</td>
                    </tr>
                  }

                </tbody>
              </table>
              <div className="d-md-flex align-items-center justify-content-between">
                <div>
                  Affichage de {startIndex + 1} à{' '}
                  {Math.min(endIndex, totalEntries)} sur {totalEntries} entrées
                </div>
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </button>
                  <button
                    className="btn btn-primary rounded-5"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= filteredData.length}
                  >
                    Suivant
                  </button>
                </div>

              </div>
            </div>
          </div>


        </div>
      </div>

{/* <Footer/> */}

    </UserDashboardLayout>
  )
}


