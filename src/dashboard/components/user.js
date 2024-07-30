import React from "react"
import { useCartContext } from "../../api/provider";
import CopierCollerComponent from "./copier-coller";
import { SITE_PATH, UPLOADS_PATH } from "../../api/vars";

export default function UserInfos() {
  const { userData } = useCartContext();

  return (
    <div className="col-md-4">
      <div className="card card-profile">
        <div className="card-header" style={{ backgroundImage: `url(${userData?.shop?.cover ? UPLOADS_PATH + userData?.shop.cover : '/assets/img/blogpost.jpg'})` }}>
          <div className="profile-picture">
            <div className="avatar avatar-xl">
              <img src={userData?.profile_image ? UPLOADS_PATH + userData?.profile_image : '/img/user-4-fill.svg'} alt="..." className="avatar-img rounded-circle" />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="user-profile text-center">
            <div className="name">{userData?.name}</div>
            <div className="job">{userData?.email}</div>
           
            {userData?.shop?.slug && <div className="view-profile"><CopierCollerComponent texteACopier={`${SITE_PATH}/boutique/${userData?.shop?.slug}`} /></div> }
            
          </div>
        </div>
      </div>
    </div>
  )
}