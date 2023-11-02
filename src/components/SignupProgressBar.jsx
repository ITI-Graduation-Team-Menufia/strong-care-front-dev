import React from 'react';
import './SignupProgressBar.scss';
import { t } from 'i18next';

const SignupProgressBar = ({ step }) => {
  const steps = [t('main-information'), t('legal-information'), t('confirmation')];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-evenly">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`circle ${index + 1 <= step ? 'active' : ''}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignupProgressBar;