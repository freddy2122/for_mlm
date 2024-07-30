export default function Footer() {
  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">© 2024 For MLM</p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <img src={'/img/Logo__1_-removebg-preview.png'} className="" width="80" height="80" alt="logo" />
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a data-bs-toggle="modal"
                data-bs-target="#exampleModal" className="nav-link px-2 text-primary cursor-pointer text-body-secondary">
                Déposer une plainte
              </a>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="modal"
                data-bs-target="#examplePlaintes" className="nav-link px-2 text-primary cursor-pointer text-body-secondary">
                Suggestion
              </a>
            </li>
          </ul>
        </footer>
      </div>
      <>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Déposer une plainte
                </h1>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Objet:
                    </label>
                    <input type="text" className="form-control" id="recipient-name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Description:
                    </label>
                    <textarea className="form-control" id="message-text" defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button type="button" className="btn btn-primary btn-sm">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>


        <div
          className="modal fade"
          id="examplePlaintes"
          tabIndex={-1}
          aria-labelledby="examplePlaintesLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="examplePlaintesLabel">
                  Suggestion
                </h1>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Votre suggestion:
                    </label>
                    <textarea className="form-control" id="message-text" defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button type="button" className="btn btn-primary btn-sm">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}