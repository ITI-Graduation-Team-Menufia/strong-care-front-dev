import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const NotFound = () => {
  return (
    <div className="container text-center">
      <div className="mt-5">
        <h1 className="display-4">404 Not Found</h1>
        <p className="lead">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link> {/* Replace with your home route */}
      </div>
    </div>
  );
};

export default NotFound;
