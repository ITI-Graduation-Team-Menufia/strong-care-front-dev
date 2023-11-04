import React from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useApi } from '../../../contexts/apiContext';

export default function Menu() {

  let { loggedUserData } = useApi();

  return (
    <div className="menu">

      {/* Static Content */}
      <div className="item">
        {/* <span className="title">Admin dashboard</span> */}
        <Link to='home' className="listItem">
          {/* <img src={home} alt="" /> */}
          <i className="fa-solid fa-house"></i>
          <span className="listItemTitle">
            <Trans i18nKey="home"></Trans>
          </span>
        </Link>

        <Link to='messages' className="listItem">
          <i class="fa-solid fa-message"></i>
          <span className="listItemTitle">
            <Trans i18nKey="clients-messages"></Trans>
          </span>
        </Link>

        {loggedUserData?.role === 'admin' &&
          <Link to='users' className="listItem">
            {/* <img src={profile} alt="" /> */}
            <i className="fa-solid fa-user"></i>
            <span className="listItemTitle">
              <Trans i18nKey="users"></Trans>
            </span>
          </Link>}

        {loggedUserData?.role === 'admin' &&
          <Link to='companies' className="listItem">
            {/* <img src={companies} alt="" /> */}
            <i className="fa-solid fa-building"></i>
            <span className="listItemTitle">
              <Trans i18nKey="companies"></Trans>
            </span>
          </Link>}

        {loggedUserData?.role === 'admin' &&
          <Link to='pendingregisterations' className="listItem">
            {/* <img src={companies} alt="" /> */}
            <i className="fa-solid fa-pause"></i>
            <span className="listItemTitle">          <Trans i18nKey="pending-registerations"></Trans>
            </span>
          </Link>}

        {loggedUserData?.role === 'admin' &&
          <Link to='companiesmap' className="listItem">
            {/* <img src={map} alt="" /> */}
            <i className='fa-solid fa-map'></i>
            <span className="listItemTitle">
              <Trans i18nKey="map"></Trans>

            </span>
          </Link>}

        {(loggedUserData?.role === 'admin' || loggedUserData?.role === 'insuranceRequestsDepart') &&
          <Link to='warrantycontracts' className="listItem">
            {/* <img src={warranty} alt="" /> */}
            <i className="fa-solid fa-file-signature"></i>
            <span className="listItemTitle">          <Trans i18nKey="warranty-contract-requests"></Trans>
            </span>
          </Link>}

        {(loggedUserData?.role === 'admin' || loggedUserData?.role === 'compensationDepart') &&
          <Link to='compensationrequests' className="listItem">
            {/* <img src={compensation} alt="" /> */}
            <i className="fa-solid fa-file-contract"></i>
            <span className="listItemTitle"><Trans i18nKey="compensations-requests"></Trans></span>
          </Link>}
      </div>
    </div>
  )
}
