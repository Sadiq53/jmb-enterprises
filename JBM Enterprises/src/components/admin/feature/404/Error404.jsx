import React from 'react'
import {NavLink} from 'react-router-dom'

const Error404 = () => { 
  return (
    <div className="auth-main v1">
  <div className="auth-wrapper">
    <div className="auth-form">
      <div className="error-card">
        <div className="card-body">
          <div className="error-image-block">
            <img
              className="img-fluid"
              src="./src/assets/images/img-error-404.png"
              alt="img"
            />
          </div>
          <div className="text-center">
            <h1 className="mt-2">Oops! Something Went wrong</h1>
            <p className="mt-2 mb-4 text-muted f-20">
              We couldn’t find the page you were looking for. Why not try back
              to the Homepage.
            </p>
            <NavLink
              className="btn btn-primary d-inline-flex align-items-center mb-3"
             to='/'
            >
              <i className="ph-duotone ph-house me-2" /> Back to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Error404