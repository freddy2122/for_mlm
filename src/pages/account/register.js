import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../css/auth.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { API_PATH } from '../../api/vars';
import { setAuthToken } from '../../api/auth-provider';
import Loader from '../../components/loader';
import { useLocation } from 'react-router-dom';


export default function Register() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  const validationSchema = Yup.object({
    name: Yup.string().required('Champ requis'),
    email: Yup.string().email('Email invalide').required('Champ requis'),
    password: Yup.string().required('Champ requis'),
    password_confirmation: Yup.string().required('Champ requis'),
    termsOfUse: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      termsOfUse: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const requestBody = {
          ...values,
          type_account: 'stockist',
        };
        const response = await fetch(`${API_PATH}/account/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(type === 'stockist' ? requestBody : values),
        });

        const response_json = await response.json();

        if (response_json.status) {
          setAuthToken(response_json.data.token.plainTextToken)

          if (type === 'stockist') {
            window.location.href = `/account/confirm-code?type=stockist`;
          } else if (type === 'recherche-de-stockiste') {
            window.location.href = `/account/confirm-code?type=recherche-de-stockiste`;
          } else if (type === 'recherche-de-produits') {
            window.location.href = `/account/confirm-code?type=recherche-de-produits`;
          } else {
            console.log(error)
          }

          setError(null);
        } else {
          setError(response_json.message);
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };


  document.title = 'Inscription - ForMLM';

  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>

      <div id="main-wrapper" className="container mt-5 mt-md-0">

        <div className="row no-gutters">

          <div className="col-lg-6 d-none d-lg-inline-block">
            <div className="account-block rounded-right">
              <div className="account-testimonial">
                {/* <Link to="/" className="text-decoration-none">
                  <img src="/img/Logo__2.png" className="img-fluid" width={200} />
                </Link> */}
                <h4 className="text-white mb-4">Très important</h4>
                {type === 'stockist' ? (
                  <p className='fs-6'>
                    En choisissant vos produits, sélectionnez uniquement dans la liste ceux qui sont
                    disponibles dans votre boutique physique et ajoutez les directement à votre boutique en
                    ligne en 1 minute top chrono.
                  </p>
                ) : (
                  <div>
                    <p className='fs-6'>
                      - Faites vos recherches de produits par pays, ville, quartiers et auprès des milliers de
                      stockiste dans le monde.
                    </p>

                    <p className='fs-6'>
                      - Trouvez vos packs d’adhésion partout dans le monde.
                    </p>

                    <p className='fs-6'>
                      - Connectez-vous directement à un stockiste pour l’exécution d’une commande ou
                      l’adhésion d’un nouveau filleul
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 bg-white">
            <div className="p-4 p-md-5">
              <div className="mb-2 mb-md-5">
                <h3 className="h4 font-weight-bold text-theme">
                  {type === 'stockist' ? 'Créer votre compte stockiste' : 'Créer votre compte partenaire'}
                </h3>
              </div>

              <h6 className="h5 mb-0">Bienvenue !</h6>
              <p className="text-muted mt-2 mb-3">Enregistrez vos informations pour accéder à votre espace membre</p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nom et Prénom</label>
                  <input type="text" className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'}`}
                    {...formik.getFieldProps('name')} id="name" />
                </div>


                <div className="form-group">
                  <label htmlFor="email">Adresse électronique</label>
                  <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                    {...formik.getFieldProps('email')} id="email" />
                </div>


                <div className="form-group mb-3">
                  <label htmlFor="password">Mot de passe</label>
                  <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} id='password'
                      className={`form-control ${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                      {...formik.getFieldProps('password')}
                    />
                    <span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility} id="basic-addon1">
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </span>
                  </div>
                  <div className="form-text" style={{ fontSize: 12 }} id="basic-addon4">
                    Le mot de passe doit contenir au moins une lettre majuscule , une lettre minuscule et des
                    caractères spéciaux (@/. ?)
                  </div>

                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password_confirmation">Confirmation du mot de passe</label>
                  <div className="input-group mb-3">
                    <input type={showPasswordConfirmation ? 'text' : 'password'} id='password_confirmation'
                      className={`form-control ${formik.touched.password_confirmation && formik.errors.password_confirmation && 'is-invalid'}`}
                      {...formik.getFieldProps('password_confirmation')}
                    />
                    <span className="input-group-text cursor-pointer" onClick={togglePasswordConfirmationVisibility} id="basic-addon1">
                      <i className={`bi ${showPasswordConfirmation ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </span>
                  </div>
                </div>

                <div className="my-2">
                  <div className="form-check">
                    <input className={`form-check-input rounded-0 ${formik.touched.termsOfUse && formik.errors.termsOfUse && 'is-invalid'}`}
                      type='checkbox'
                      id='termsOfUse'
                      {...formik.getFieldProps('termsOfUse')} />
                    <small className="form-check-label" htmlFor="gridCheck">
                      Accepter <Link to={'#'}>conditions générales</Link> et <Link to={'#'}> politique de confidentialité</Link>.
                    </small>

                    {formik.touched.termsOfUse && formik.errors.termsOfUse ? (
                      <div className='invalid-feedback'>{formik.errors.termsOfUse}</div>
                    ) : null}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Enrégistrer</button>
              </form>
            </div>
          </div>

          <p className="text-muted col-12 text-center mt-3 mb-0">Vous avez deja un compte ? <Link to="/account/login" className="text-primary ml-1">Connexion</Link></p>
        </div>

      </div>
      {isLoading && <Loader />}

      {error && (
        <div className="account-alert">
          <div className="alert alert-danger bg-white">
            <button type="button" className="btn btn-danger btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setError(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}