import React from 'react';
import './SignupProgressBar.scss';

const SignupProgressBar = ({ step }) => {
  const steps = ['البيانات الاساسية', 'البيانات القانونية', 'تأكيد التسجيل'];

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