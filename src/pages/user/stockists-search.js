import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_PATH } from '../../api/vars';
import { getAuthToken, isAuthenticated } from "../../api/auth-provider";
import UserDashboardLayout from "../../dashboard/layout/user-simple-layout";

const columns = [
  { key: 'col1', label: 'Nom du stockiste' },
  { key: 'col2', label: 'Localisation' },
];

export default function StockisteSearch() {
  const [getUserData, setGetUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(getUserData);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/account/login';
      return;
    }

    async function fetchData() {
      try {
        const headers = {
          Authorization: `Bearer ${getAuthToken()}`,
        };

        const response = await fetch(`${API_PATH}/shop_all`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const userData = await response.json();
          setGetUserData(userData.boutiques);
        } else {
          console.error('Erreur lors de la récupération des données :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrer les données en fonction de la recherche
    const filtered = getUserData.flatMap(row => ({
      col1: row.stockist.name,
      col2: `${row.stockist.country} - ${row.stockist.city}`,
      phone: row.stockist.phone,
      email: row.stockist.email,
      slug: row.slug,
    })).filter(row =>
      columns.some(col =>
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
      <div className="py-3">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Recherche de stockiste</h4>
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
                    {columns.map(col => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((row, index) => (
                      <tr key={index}>
                        {columns.map(col => (
                          <td key={col.key}>{row[col.key]}</td>
                        ))}
                        <td>
                          <div className="form-button-action">
                            {row.email &&
                              <Link to={`mailto:${row.email}`} target="_blank" className="btn btn-success border rounded-circle mr-xl-1">
                                <i className="bi bi-envelope-fill"></i>
                              </Link>
                            }
                            {row.slug &&
                              <Link to={`/boutique/${row.slug}`} className="btn btn-secondary border rounded-circle mr-xl-1">
                                <i className="bi bi-eye-fill"></i>
                              </Link>
                            }
                            <a className="btn btn-warning border rounded-circle mr-xl-1">
                              <i className="bi bi-exclamation-triangle-fill"></i>
                            </a>
                            <a className="btn btn-success border text-white rounded">
                              Discuter
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">Aucun stockiste trouvé</td>
                    </tr>
                  )}
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
    </UserDashboardLayout>
  );
}
