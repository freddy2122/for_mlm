import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../dashboard/layout/dashboard-layout'
import UserInfos from '../../dashboard/components/user'
import { getAuthToken, isAuthenticated } from '../../api/auth-provider';
import { useCartContext } from '../../api/provider';
import { API_PATH } from "../../api/vars";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Loader from '../../components/loader';
import axios from 'axios';

export default function DashboardHome() {
  const { userData } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const [name, setName] = useState(userData?.shop?.name ? userData?.shop.name : '');
  const [whatsapp, setWhatsapp] = useState(userData?.shop?.whatsapp ? userData?.shop.whatsapp : '');
  const [continent, setContinent] = useState(userData?.shop?.continent ? userData?.shop.continent : '');
  const [city, setCity] = useState(userData?.shop?.city ? userData?.shop.city : '');
  const [country, setCountry] = useState(userData?.shop?.country ? userData?.shop.country : '');
  const [email, setEmail] = useState(userData?.shop?.email ? userData?.shop.email : '');
  const [phone, setPhone] = useState(userData?.shop?.phone ? userData?.shop.phone : '');
  const [address, setAddress] = useState(userData?.shop?.address ? userData?.shop.address : '');

  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }


  useEffect(() => {
    if (userData?.type_account === 'stockist') {

    } else {
      window.location.href = '/recherche-de-produits';

    }
  }, [userData]);


  const validationSchema = Yup.object({
    name: Yup.string().required('Champ requis'),
    city: Yup.string().required('Champ requis'),
    email: Yup.string().required('Champ requis'),
    country: Yup.string().required('Champ requis'),
    continent: Yup.string().required('Champ requis'),
    phone: Yup.string().required('Champ requis'),
    whatsapp: Yup.string().required('Champ requis'),
    address: Yup.string().required('Champ requis'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      email: '',
      country: '',
      continent: '',
      phone: '',
      whatsapp: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_PATH}/shop-create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const response_json = await response.json();

        if (response_json.success) {
          setSuccessToast(response_json.message);
          window.location.reload();
        } else {
          setErrorToast(response_json.error);
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleUpdateShop = () => {

    setIsLoading(true);
    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('whatsapp', whatsapp);
    formData.append('continent', continent);
    formData.append('address', address);

    axios.post(`${API_PATH}/update_store/${userData?.shop.id}`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setSuccessToast(response.data.message);
        setErrorToast('');
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
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

          {userData?.shop ?
            <form className="col-md-8">
              <div className="card full-height">
                <div className="card-header">
                  <div className="card-title">Informations de la boutique</div>
                </div>
                <div className="card-body">
                  <div className='row'>
                    <div className="form-group col-6">
                      <label htmlFor="name">Nom de la boutique</label>
                      <input type="text" className={`form-control`} value={name} onChange={(e) => setName(e.target.value)} id="name" />
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="name">Email de la boutique</label>
                      <input type="email" className={`form-control`} value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Contact</label>
                      <input type="text" className={`form-control`} value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="whatsapp">Contact Whatsapp</label>
                      <input type="text" className={`form-control`} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} id="whatsapp" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="continent">Continent</label>
                      <input type="text" className={`form-control`} value={continent} onChange={(e) => setContinent(e.target.value)} id="continent" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="country">Pays</label>
                      <input type="text" className={`form-control`} value={country} onChange={(e) => setCountry(e.target.value)} id="country" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="city">Ville</label>
                      <input type="text" className={`form-control`} value={city} onChange={(e) => setCity(e.target.value)} id="city" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="city">Adresse</label>
                      <input type="text" className={`form-control`} value={address} onChange={(e) => setCity(e.target.value)} id="city" />
                    </div>

                  </div>
                </div>
                <div className="card-action">
                  <button onClick={handleUpdateShop} type='button' className="btn btn-success">Mettre à jour</button>
                </div>

              </div>
            </form>
            :
            <form className="col-md-8" onSubmit={formik.handleSubmit}>
              <div className="card full-height">
                <div className="card-header">
                  <div className="card-title">Création de la boutique</div>
                  <p className='text-warning'>Veuillez créer votre boutique.</p>
                </div>
                <div className="card-body">
                  <div className='row'>
                    <div className="form-group col-6">
                      <label htmlFor="name">Nom de la boutique</label>
                      <input type="text" className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'}`} {...formik.getFieldProps('name')} id="name" />
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="name">Email de la boutique</label>
                      <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`} {...formik.getFieldProps('email')} id="email" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Contact</label>
                      <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone && 'is-invalid'}`} {...formik.getFieldProps('phone')} id="phone" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="whatsapp">Contact Whatsapp</label>
                      <input type="text" className={`form-control ${formik.touched.whatsapp && formik.errors.whatsapp && 'is-invalid'}`} {...formik.getFieldProps('whatsapp')} id="whatsapp" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="continent">Continent</label>
                      <input type="text" className={`form-control ${formik.touched.continent && formik.errors.continent && 'is-invalid'}`} {...formik.getFieldProps('continent')} id="continent" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="country">Pays</label>
                      <input type="text" className={`form-control ${formik.touched.country && formik.errors.country && 'is-invalid'}`} {...formik.getFieldProps('country')} id="country" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="city">Ville</label>
                      <input type="text" className={`form-control ${formik.touched.city && formik.errors.city && 'is-invalid'}`} {...formik.getFieldProps('city')} id="city" />
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="address">Adresse</label>
                      <input type="text" className={`form-control ${formik.touched.address && formik.errors.address && 'is-invalid'}`} {...formik.getFieldProps('address')} id="address" />
                    </div>

                  </div>
                </div>
                <div className="card-action">
                  <button type='submit' className="btn btn-success">Créer une boutique</button>
                </div>

              </div>
            </form>
          }
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