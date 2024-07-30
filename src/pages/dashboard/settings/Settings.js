import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../dashboard/layout/dashboard-layout'
import UserInfos from '../../../dashboard/components/user'
import { getAuthToken, isAuthenticated } from '../../../api/auth-provider';
import { useCartContext } from '../../../api/provider';
import { API_PATH } from "../../../api/vars";
import Loader from '../../../components/loader';
import axios from 'axios';

export default function DashboardSettings() {
  const { userData } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const [name, setName] = useState(userData?.name ? userData?.name : '');
  const [city, setCity] = useState(userData?.city ? userData?.city : '');
  const [country, setCountry] = useState(userData?.country ? userData?.country : '');
  const [email, setEmail] = useState(userData?.email ? userData?.email : '');
  const [phone, setPhone] = useState(userData?.phone ? userData?.phone : '');
  const [profileImage, setProfileImage] = useState(null);
  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }

  const fileInputRef = React.createRef();

  // useEffect(() => {
  //   if (userData?.type_account != 'stockist') {
  //     window.location.href = '/';
  //   }
  // }, [userData]);

// console.log(userData)
  const handleUpdateShop = () => {
    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('profile_image', profileImage);

    axios.post(`${API_PATH}/account/profile/${userData?.slug}`, formData,{
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => {
        setSuccessToast(response.data.message);
        setErrorToast('');
        window.location.reload();
      })
      .catch((error) => {
        setErrorToast(error.response.data.error);
        setSuccessToast('');
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <DashboardLayout>
        <div className="row mt--2">

          <UserInfos />

          <form className="col-md-8">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-title">Informations du compte</div>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Nom et prénoms</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`form-control`} id="name" />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email"value={email} onChange={(e) => setEmail(e.target.value)}  className={`form-control`} id="email" />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="phone">Numéro de téléphone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={`form-control`} id="phone" />
                  </div>


                  <div className="form-group col-md-4">
                    <label htmlFor="country">Pays</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className={`form-control`} id="country" />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="city">Ville</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={`form-control`} id="city" />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="profile_image">Photo de profil</label>
                    <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept=".jpg, .jpeg, .png" className={`form-control`} id="profile_image" />
                  </div>


                </div>
              </div>
              <div className="card-action">
                <button onClick={handleUpdateShop} type='button' className="btn btn-success">Mettre à jour</button>
              </div>

            </div>
          </form>
        </div>

        {errorToast && (
          <div className="account-alert">
            <div className="alert alert-danger bg-white">
              <button type="button" className="btn btn-danger btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setErrorToast(null)}><i className="bi bi-x"></i></button>
              <hr className="message-inner-separator" />
              <p>{errorToast}</p>
            </div>
          </div>
        )}
        {successToast && (
          <div className="account-alert">
            <div className="alert alert-success bg-white">
              <button type="button" className="btn btn-success btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setSuccessToast(null)}><i className="bi bi-x"></i></button>
              <hr className="message-inner-separator" />
              <p>{successToast}</p>
            </div>
          </div>
        )}

      </DashboardLayout>
    </>
  )
}