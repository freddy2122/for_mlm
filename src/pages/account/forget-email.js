import { Link } from "react-router-dom";
import '../../css/auth.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";


export default function ForgetEmail() {
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
        const response = await fetch('http://app.formlm.com/account/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          mode: 'no-cors',
        });


        if (response.success) {
          // window.location.href = '/account';
        } else {
          setError('Erreur lors de la connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    },
  });

  document.title = 'Réinitialisation du mot de passe - ForMLM';
  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div id="main-wrapper" className="">
        <div className="row no-gutters">
          <div className="col-lg-12 bg-white">
            <div className="p-5">
              <div className="mb-5 d-flex justify-content-between align-items-center">
                <h3 className="h4 font-weight-bold text-theme">Email</h3>
              </div>

              <h6 className="h5 mb-0">Bienvenue !</h6>
              <p className="text-muted mt-2 mb-5">Saisissez votre adresse électronique pour accéder au panneau d'administration.</p>

              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Adresse email</label>
                  <input type="email" className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                    {...formik.getFieldProps('email')} id="email" />
                </div>
                <button type="submit" className="btn btn-primary">Confirmer</button>
              </form>
            </div>
          </div>
        </div>
        <p className="text-muted text-center mt-3 mb-0">Retourner à la page<Link to="/" className="text-primary ml-1">d'accueil</Link></p>
      </div>
    </div>
  )
}