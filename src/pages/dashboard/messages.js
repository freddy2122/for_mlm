import React, { useEffect } from 'react'
import DashboardLayout from '../../dashboard/layout/dashboard-layout'
import UserInfos from '../../dashboard/components/user'
import { isAuthenticated } from '../../api/auth-provider';
import { useCartContext } from '../../api/provider';

export default function Messages() {
  const { userData } = useCartContext();

  if (!isAuthenticated()) {
    window.location.href = '/account/login';
  }


  useEffect(() => {
    if (userData?.type_account === 'stockist') {

    } else {
      window.location.href = '/recherche-de-produits';

    }
  }, [userData]);
  return (
    <DashboardLayout>
      <div className="row mt--2">
        <UserInfos />


        <div className="col-md-8">
          <div className="card full-height">
            <div className="card-header">
              <div className="card-head-row">
                <div className="card-title">Liste des messages</div>
                {/* <div className="card-tools">
                  <ul className="nav nav-pills nav-secondary nav-pills-no-bd nav-sm" id="pills-tab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link" id="pills-today" data-toggle="pill" href="#pills-today" role="tab" aria-selected="true">Aujourd'hui</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="pills-week" data-toggle="pill" href="#pills-week" role="tab" aria-selected="false">Semaine</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-month" data-toggle="pill" href="#pills-month" role="tab" aria-selected="false">Mois</a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex">
                <div className="avatar">
                  <span className="avatar-title rounded-circle border border-white bg-info">M</span>
                </div>
                <div className="flex-1 ml-3 pt-1">
                  <h6 className="text-uppercase fw-bold mb-1">For MLM</h6>
                  <span className="text-muted">Bienvenue parmis nous.</span>
                </div>
                {/* <div className="float-right pt-1">
                  <small className="text-muted">8:40 PM</small>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}