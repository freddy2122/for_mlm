import { Link } from "react-router-dom";
import '../../css/auth.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";
import { isAuthenticated, setAuthToken } from "../../api/auth-provider";
import { API_PATH } from "../../api/vars";
import { useCartContext } from "../../api/provider";
import Loader from '../../components/loader';


export default function Login() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { userData } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  
  if (isAuthenticated()) {
    if (userData?.type_account === 'stockist') {
      window.location.href = '/store-manager';
    } else if (userData?.type_account === 'distributor') {
      window.location.href = '/recherche-de-produits';
    }
  }
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Champ requis'),
    password: Yup.string().required('Champ requis'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_PATH}/account/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          // mode:'no-cors'
        });

        const response_json = await response.json();

        // console.log(response_json.user_type)
        if (response_json.success) {

          setAuthToken(response_json.token.plainTextToken)

          
          if (response_json.user_type === 'stockist') {
            window.location.href = '/store-manager';
          } else  {
            window.location.href = '/recherche-de-produits';
          }
        } else {
          setError('Le compte n\'existe pas ou les informations sont incorrectes.');
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }finally{
        setIsLoading(false);
      }
    },
  });


  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  document.title = 'Connexion - ForMLM';
  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <Loader />}
      <div id="main-wrapper" className="container">

        <div className="row no-gutters">

          <div className="col-lg-6 d-none d-lg-inline-block">
            <div className="account-block rounded-right">
              <div className="account-testimonial">
                {/* <Link to="/" className="text-decoration-none">
                  <img src="/img/Logo__2.png" className="img-fluid" width={200} />
                </Link> */}
                <h4 className="text-white mb-4">Très important</h4>
                <p className='fs-6'>
                  En choisissant vos produits, sélectionnez uniquement dans la liste ceux qui sont
                  disponibles dans votre boutique physique et ajoutez les directement à votre boutique en
                  ligne en 1 minute top chrono.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-white">
            <div className="p-4 p-md-5">
              <div className="mb-5 d-flex justify-content-between">
                <h3 className="h4 font-weight-bold text-theme">Connexion</h3>
              </div>

              <h6 className="h5 mb-0">Bienvenue !</h6>
              <p className="text-muted mt-2 mb-5">Enregistrez vos informations pour accéder à votre espace membre</p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Adresse email</label>
                  <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`} {...formik.getFieldProps('email')} id="email" />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="exampleInputPassword1">Mot de passe</label>

                  <div className="input-group mb-3">
                    <input type={showPassword ? 'text' : 'password'} id='password'
                      className={`form-control ${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                      {...formik.getFieldProps('password')}
                    />
                    <span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility} id="basic-addon1">
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </span>
                  </div>

                </div>
                <div className='d-flex align-items-center justify-content-between'>
                  <button type="submit" className="btn btn-primary">Connexion</button>
                  <Link to="/account/forget-password" className="forgot-link float-right text-primary">Mot de passe oublié ?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="text-muted text-center mt-3 mb-0">Vous n'avez pas de compte ? <Link to="/" className="text-primary ml-1">Inscription</Link></p>
      </div>

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