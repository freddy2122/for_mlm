import { Link } from "react-router-dom";
import '../../css/auth.css'
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { API_PATH } from "../../api/vars";
import Loader from "../../components/loader";
import { useCartContext } from "../../api/provider";
import axios from "axios";
import { getAuthToken } from "../../api/auth-provider";


export default function StepComponent() {
  const [active, setActive] = useState(1);
  const steps = [1, 2, 3, 4];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userData } = useCartContext();
  const [userType, setUserType] = useState();

  const validationSchema = Yup.object({
    name: Yup.string().required('Code requis'),
    country: Yup.string().required('Code requis'),
    city: Yup.string().required('Code requis'),
    phone: Yup.string().required('Code requis'),
    email: Yup.string().required('Champ requis'),
    whatsapp: Yup.string().required('Champ requis'),
    address: Yup.string().required('Champ requis'),
    continent: Yup.string().required('Champ requis'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      country: '',
      city: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      continent: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)

        const response = await fetch(`${API_PATH}/shop-create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(values),
        });

        const response_json = await response.json();
        // console.log(response_json)
        if (response_json.success) {

          window.location.href = "/store-manager";

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


  const handleNext = () => {
    const selectedType = document.querySelector("#type_account").value;

    const headers = {
      Authorization: `Bearer ${getAuthToken()}`,
    };
    if (selectedType === "distributeur") {

      setUserType(true)

      axios.put(`${API_PATH}/account/type_compte_update/${userData?.id}`, { type_account: '' }, { headers })
        .then(response => {
          window.location.href = "/account/login";
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du type de compte :', error);
        });
    } else {
      setActive(prevActive => (prevActive < steps.length ? prevActive + 1 : prevActive));
    }
  };


  const handleNextOther = () => {

    setActive(prevActive => (prevActive < steps.length ? prevActive + 1 : prevActive));

  };
  const handlePrev = () => {
    setActive(prevActive => (prevActive > 1 ? prevActive - 1 : prevActive));
  };


  document.title = 'Inscription - ForMLM';
  return (
    <div style={{ backgroundColor: '#ffc045', display: 'flex', width: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div id="main-wrapper" className="container">

        <div className="row no-gutters">
          <div className="col-lg-12 bg-white rounded-lg">
            <div className="px-2 py-5 p-md-5">
              <div className="mb-5">
                <h3 className="h4 font-weight-bold text-theme text-center">Apprenons à vous connaitre</h3>
              </div>

              <div className="d-flex justify-content-center">
                <div className="w-50">
                  <div id="progress">
                    <div id="progress-bar" style={{ width: `${((active - 1) / (steps.length - 1)) * 100}%` }}></div>
                    <ul id="progress-num">
                      {steps.map((step, index) => (
                        <li key={index} className={`step ${index < active ? 'active' : ''}`}>
                          {/* {step} */}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-2">Bonjour {userData?.name} !</p>
              <form onSubmit={formik.handleSubmit}>
                {active === 1 && <>
                  <div className="form-group">
                    <label htmlFor="type_account">Qu'est-ce que vous êtes ?</label>
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      id="type_account"
                      name="type_account"
                    >
                      <option value="stockiste">Stockiste</option>
                      <option value="distributeur">Simple distributeur</option>
                    </select>
                  </div>


                  <div className='col-12 text-center'>
                    {userType ? (
                      <Link to="/page-de-connexion" className="btn btn-primary">
                        Continuer vers la connexion
                      </Link>
                    ) : (
                      <span className="btn btn-primary" onClick={handleNext} disabled={active === steps.length}>
                        Continuer
                      </span>
                    )}
                  </div>
                </>}

                {active === 2 && <>

                  <div className="form-group">
                    <label>Quel est le nom de la boutique ?</label>
                    <input type="text" className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'}`}
                      {...formik.getFieldProps('name')} placeholder="Nom" id="name" />
                  </div>

                  <div className='col-12 text-center'>
                    <span className="btn btn-primary" onClick={handleNextOther} disabled={active === steps.length}>Continuer</span>
                  </div>
                </>}

                {active === 3 && <>

                  <div className="form-group">
                    <label>Comment peut-on vous contacter ?</label>
                    <input type="text" className={`form-control ${formik.touched.whatsapp && formik.errors.whatsapp && 'is-invalid'}`}
                      {...formik.getFieldProps('whatsapp')} placeholder="Numero whatsapp" id="whatsapp" />
                  </div>

                  <div className="form-group">
                    <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone && 'is-invalid'}`}
                      {...formik.getFieldProps('phone')} placeholder="Telephone" id="phone" />
                  </div>

                  <div className="form-group">
                    <input type="text" className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                      {...formik.getFieldProps('email')} placeholder="Adresse email de la boutique" id="email" />
                  </div>

                  <div className='col-12 text-center'>
                    <span className="btn btn-primary" onClick={handleNextOther} disabled={active === steps.length}>Continuer</span>
                  </div>
                </>}

                {active === 4 && <>
                  <div className="form-group">
                    <label>Adresse et localisation ?</label>
                    <input type="text" className={`form-control ${formik.touched.continent && formik.errors.continent && 'is-invalid'}`}
                      {...formik.getFieldProps('continent')} placeholder="Continent" id="continent" />
                  </div>

                  <div className="form-group">
                    <input type="text" className={`form-control ${formik.touched.country && formik.errors.country && 'is-invalid'}`}
                      {...formik.getFieldProps('country')} placeholder="Pays" id="country" />
                  </div>

                  <div className="form-group">
                    <input type="text" className={`form-control ${formik.touched.city && formik.errors.city && 'is-invalid'}`}
                      {...formik.getFieldProps('city')} placeholder="Ville" id="city" />
                  </div>

                  <div className="form-group">
                    <input type="text" className={`form-control ${formik.touched.address && formik.errors.address && 'is-invalid'}`}
                      {...formik.getFieldProps('address')} placeholder="Adresse" id="address" />
                  </div>

                </>}
                <div className={`col-12 text-center ${active === 4 ? 'd-block' : 'd-none'}`}>
                  <button type="submit" className="btn btn-primary">Terminer la configuration</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      {isLoading && <Loader />}
    </div>
  )
}