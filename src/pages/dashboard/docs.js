import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard/layout/dashboard-layout'
import UserInfos from '../../dashboard/components/user'
import { getAuthToken, isAuthenticated } from '../../api/auth-provider';
import { useCartContext } from '../../api/provider';
import Loader from '../../components/loader';
import { API_PATH, UPLOADS_PATH } from '../../api/vars';
import axios from 'axios';

export default function Docs() {
  const { userData } = useCartContext();
  const [certification, setCertification] = useState(null);
  const [idCarte, setIdCarte] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  useEffect(() => {
    if (userData?.type_account === 'stockist') {

    } else {
      window.location.href = '/recherche-de-produits';

    }
  }, [userData]);
  const handleUpdateShop = () => {
    setIsLoading(true)
    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('certification', certification);
    formData.append('id_carte', idCarte);


    axios.post(`${API_PATH}/update_store/${userData?.shop.id}`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setIsLoading(false)
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setSuccessMessage('');
        setIsLoading(false)
      });
  };

  const handleReloadClick = () => {
    setErrorMessage('Veuillez créer votre boutique dans le menu dashboard.')
  }

  return (
    <>
      {isLoading && <Loader />}
      <DashboardLayout>
        <div className="row mt--2">
          <UserInfos />

          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Documents officiels</div>
              </div>
              <div className="card-body">
                <form className="row">

                  <div className="form-group col-12">
                    <label htmlFor="formFile" className='mb-0'>Ajouter votre contrat de stockiste (Uniquement PDF)</label>
                    <div className="form-text text-danger" style={{ fontSize: 12 }} id="basic-addon4">
                      Ce document est strictement confidentiel et ne sera pas rendu
                      publique. C’est pour les besoins de confirmation de votre statut de stockiste Longrich
                    </div>
                    <input className="form-control" type="file" onChange={(e) => setCertification(e.target.files[0])} accept=".pdf" id="formFile" />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="formFileCNI">Ajoutez votre pièce d'identité </label>
                    <input className="form-control" type="file" onChange={(e) => setIdCarte(e.target.files[0])} accept=".pdf" id="formFileCNI" />
                  </div>


                </form>
              </div>
              <div className="card-action">
                {userData?.shop ?

                  <button type="button" onClick={handleUpdateShop} className="btn btn-success">Mettre à jour</button>
                  :
                  <button type="button" onClick={handleReloadClick} className="btn btn-success">Mettre à jour</button>

                }
              </div>
            </div>


            {userData.shop && <div className='row'>

              {userData?.shop.certification &&
                <div className="col-md-4">
                  <div className="card card-post card-round">
                    <div className="card-body">
                      <div className="d-flex">

                        <div className="info-post ml-2">
                          <p className="username">Certificat de stockiste</p>
                          <p className="date text-muted">{userData?.name}</p>
                        </div>
                      </div>
                      <div className="separator-solid"></div>
                      <a href={UPLOADS_PATH + userData?.shop.certification} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-rounded btn-sm">Télécharger</a>

                    </div>
                  </div>
                </div>
              }

              {userData?.shop.id_carte &&
                <div className="col-md-4">
                  <div className="card card-post card-round">
                    <div className="card-body">
                      <div className="d-flex">

                        <div className="info-post ml-2">
                          <p className="username">Pièce d'identité</p>
                          <p className="date text-muted">{userData?.name}</p>
                        </div>
                      </div>
                      <div className="separator-solid"></div>
                      <a href={UPLOADS_PATH + userData?.shop.id_carte} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-rounded btn-sm">Télécharger</a>

                    </div>
                  </div>
                </div>
              }
            </div>}

          </div>
        </div>
      </DashboardLayout>
      {errorMessage && (
        <div className="account-alert">
          <div className="alert alert-danger bg-white">
            <button type="button" className="btn btn-danger btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setErrorMessage(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="account-alert">
          <div className="alert alert-success bg-white">
            <button type="button" className="btn btn-success btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setSuccessMessage(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}