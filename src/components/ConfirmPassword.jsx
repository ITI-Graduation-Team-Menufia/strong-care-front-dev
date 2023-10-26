import React from 'react'
import { Trans } from 'react-i18next'

export const ConfirmPassword = () => {
  return (
    <div className="container">
    <div className="row d-flex justify-content-center my-5">
      <form className="col-md-5 col-sm-7 col-9 d-flex flex-column">
      <div className="form-outline mb-4">
        <input
          type="password"
          className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
          id="form2Example2"
          required
        />
        <label className="form-label" htmlFor="form2Example2">
        <Trans i18nKey="new-password"></Trans>
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          type="password"
          className="form-control rounded-0 border-0 border-bottom border-black-50 mb-3"
          id="form2Example2"
          required
        />
        <label className="form-label" htmlFor="form2Example2">
        <Trans i18nKey="confirm-password"></Trans>
        </label>
      </div>




        <div className="text-center mt-3">
        <button
          type="button"
          className="request-btn text-white col-4 mb-5"
        >
          <Trans i18nKey="confirming"></Trans>
        </button>


        </div>
      </form>
    </div>
  </div>
  )
}
