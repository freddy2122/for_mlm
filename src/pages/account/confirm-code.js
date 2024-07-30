import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/auth.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { API_PATH } from '../../api/vars';
import Loader from '../../components/loader';
import { useCartContext } from '../../api/provider';
import { useLocation } from 'react-router-dom';

export default function ConfirmCode() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useCartContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  const validationSchema = Yup.object({
    confirm_code: Yup.string().required('Code requis'),
  });

  const formik = useFormik({
    initialValues: {
      confirm_code: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)

        const requestBody = {
          ...values,
          email: userData.email,
        };

        const response = await fetch(`${API_PATH}/account/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const response_json = await response.json();
        if (response_json.status) {

          if (type === 'stockist') {
            window.location.href = `/account/personal-information`;
          } else if (type === 'recherche-de-stockiste') {
            window.location.href = `/recherche-de-stockiste`;
          } else if (type === 'recherche-de-produits') {
            window.location.href = `/recherche-de-produits`;
          } else {
            console.log('error')
          }

        } else {
          setError('Erreur lors de la confirmation');
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      } finally {
        setIsLoading(false)
      }
    },
  });

  document.title = "Confirmation d'Email - ForMLM";
  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      {error && (
        <div className="account-alert">
          <div className="alert alert-danger bg-white">
            <button type="button" className="btn btn-danger btn-sm" data-dismiss="alert" aria-hidden="true" onClick={() => setError(null)}><i className="bi bi-x"></i></button>
            <hr className="message-inner-separator" />
            <p>{error}</p>
          </div>
        </div>
      )}
      <div id="main-wrapper" className="">
        <div className="row no-gutters">
          <div className="col-lg-12 bg-white">
            <div className="p-5">
              <div className="mb-5 d-flex justify-content-between align-items-center">
                <h3 className="h4 font-weight-bold text-theme">Confirmation de l'adresse email</h3>
              </div>

              <p className="text-muted">Saisissez le code de confirmation que vous avez reçu par e-mail.</p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group form-control-number-no-arrows">
                  <label htmlFor="code">Code de confirmation</label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.confirm_code && formik.errors.confirm_code && 'is-invalid'}`}
                    {...formik.getFieldProps('confirm_code')}
                    id="confirm_code"
                    placeholder='MLM-XXXXXX'
                  />
                  {formik.touched.confirm_code && formik.errors.confirm_code && (
                    <div className="invalid-feedback">{formik.errors.confirm_code}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Confirmer
                </button>
              </form>
            </div>
          </div>
        </div>
        <p className="text-muted text-center mt-3 mb-0">
          Vous n'avez pas reçu de code de confirmation ?&nbsp;
          <Link to="/account/resend-code" className="text-primary ml-1">
            Renvoyer le code
          </Link>
        </p>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
