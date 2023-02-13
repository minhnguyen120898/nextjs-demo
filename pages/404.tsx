import React from 'react'

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#333' }}>404</h1>
        <h2 style={{ color: '#333' }}>Page Not Found</h2>
        <p style={{ color: '#333' }}>
          The page you were looking for could not be found.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
