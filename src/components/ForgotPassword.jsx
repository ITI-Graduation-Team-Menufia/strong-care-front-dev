import React from 'react'
import { Trans } from 'react-i18next'

export const ForgotPassword = () => {
  return (
    <div className="container">
    <div className="row d-flex justify-content-center my-5">
        <h5 className='text-center mb-5'><Trans i18nKey="forgetten-password"></Trans></h5>
      <form className="col-md-5 col-sm-7 col-9 d-flex flex-column">
        <div className="form-outline mb-4">
          <input
            type="email"
            className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
            id="form2Example1"
            required
          />
          <label className="form-label" htmlFor="form2Example1">
          <Trans i18nKey="email"></Trans>
          </label>
        </div>




        <div className="text-center mt-3">
        <button
          type="button"
          className="request-btn text-white col-4 mb-5"
        >
          <Trans i18nKey="send"></Trans>
        </button>


        </div>
      </form>
    </div>
  </div>
  )
}