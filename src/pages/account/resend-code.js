import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/auth.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function ResendCode() {
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Champ requis'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://app.formlm/account/resend-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.success) {
          // Redirigez l'utilisateur vers une page de confirmation réussie ou une autre page appropriée
        } else {
          setError('Erreur lors de la demande de code de confirmation');
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    },
  });

  document.title = "Renvoyer le Code de Confirmation - ForMLM";
  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div id="main-wrapper" className="">
        <div className="row no-gutters">
          <div className="col-lg-12 bg-white">
            <div className="p-5">
              <div className="mb-5 d-flex justify-content-between align-items-center">
                <h3 className="h4 font-weight-bold text-theme">Renvoyer le Code de Confirmation</h3>
              </div>

              <p className="text-muted">Saisissez votre adresse
                mail pour obtenir votre code de confirmation</p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Adresse E-mail</label>
                  <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                    {...formik.getFieldProps('email')}
                    id="email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Renvoyer le Code
                </button>
              </form>
            </div>
          </div>
        </div>
        <p className="text-muted text-center mt-3 mb-0">
          Retour à la <Link to="/account/confirm-email" className="text-primary ml-1">
            page de confirmation
          </Link>
        </p>
      </div>
    </div>
  );
}
