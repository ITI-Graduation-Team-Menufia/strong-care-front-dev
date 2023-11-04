import React, { useState } from 'react'
import { Trans } from 'react-i18next';

export function RegisterationProgressBar(props) {
    
    let {phase} = props;

    return (
        // <div className="container mt-5">
        //     <div className="row justify-content-center">
        //         <div className="col-md-8">
        //             <div className="card">
        //                 <div className="card-header">
        //                     <ul className="nav nav-pills card-header-pills" id="signupTabs">
        //                         <li className={`nav-item ${activeTab === 'personalInfo' ? 'active' : ''}`}>
        //                             <button className="nav-link" onClick={() => handleTabChange('personalInfo')}>
        //                                 <div className="progress-circle">1</div> Personal Info
        //                             </button>
        //                         </li>
        //                         <li className={`nav-item ${activeTab === 'accountDetails' ? 'active' : ''}`}>
        //                             <button className="nav-link" onClick={() => handleTabChange('accountDetails')}>
        //                                 <div className="progress-circle">2</div> Account Details
        //                             </button>
        //                         </li>
        //                         <li className={`nav-item ${activeTab === 'confirmation' ? 'active' : ''}`}>
        //                             <button className="nav-link" onClick={() => handleTabChange('confirmation')}>
        //                                 <div className="progress-circle">3</div> Confirmation
        //                             </button>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="container w-75 m-5 mx-auto">
        <div className='d-flex w-75 mx-auto justify-content-around'>
            <div className='border border-2 w-25 h- rounded-circle p-4' ><Trans i18nKey="main-information"></Trans></div>
            <hr className='text-primary' />
            <div className='border border-2 w-25 h- rounded-circle p-4' ><Trans i18nKey="legal-information"></Trans></div>
            <hr className='text-primary' />
            <div className='border border-2 w-25 h- rounded-circle p-4' > <Trans i18nKey="confirmation"></Trans></div>
        </div>
        </div>
    )
};