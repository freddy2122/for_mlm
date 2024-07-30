import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard/layout/dashboard-layout'
import UserInfos from '../../dashboard/components/user'
import { getAuthToken, isAuthenticated } from '../../api/auth-provider';
import ColorSettings from '../../components/color-setting';
import { API_PATH } from '../../api/vars';
import { useCartContext } from '../../api/provider';
import axios from 'axios';
import Loader from '../../components/loader';

export default function ApparenceThemes() {
  const { userData } = useCartContext();
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
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
    formData.append('logo', logo);
    formData.append('cover', cover);

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
          <form className="col-md-8">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-title">
                  Apparence et thèmes
                </div>
              </div>
              <div className="card-body">
                <div className="row">


                  <ColorSettings />
                  <div className="form-group col-12">
                    <label htmlFor="formFile">Logo de l'entreprise</label>
                    <input className="form-control" type="file" onChange={(e) => setLogo(e.target.files[0])} accept=".jpg, .jpeg, .png" id="formFile" />
                    {logo && (
                      <div className="avatar avatar-xxl my-2">
                        <img src={URL.createObjectURL(logo)} alt="..." className="avatar-img rounded-circle" />
                      </div>
                    )}
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="formFileCNI">Bannière</label>
                    <input className="form-control" type="file" onChange={(e) => setCover(e.target.files[0])} accept=".jpg, .jpeg, .png" id="formFileCNI" />
                    {cover && (<div className='my-2' style={{ backgroundImage: `url(${URL.createObjectURL(cover)})`, backgroundSize: 'cover', height: '150px' }}></div>)}
                  </div>

                </div>
              </div>
              <div className="card-action">
                {userData?.shop ?

                  <button type="button" onClick={handleUpdateShop} className="btn btn-success">Mettre à jour</button>
                  :
                  <button type="button" onClick={handleReloadClick} className="btn btn-success">Mettre à jour</button>

                }
              </div>
            </div>
          </form>
        </div>

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
      </DashboardLayout>
    </>
  )
}