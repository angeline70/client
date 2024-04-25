import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext)
  const [error, setError] = useState(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) return; 

    fetch('http://localhost:5001/profiles', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [token]);

  if (error) {
    return <div>Error fetching profiles: {error}</div>;
  }

  function logout() {
    fetch ('http://localhost:5001/logout', {
      credentials: 'include',
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        setUserInfo(null); // Clear user info after logout
        // Redirect to login page
        window.location.href = '/login'; 
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Logout failed:', error);
     
    });
  }
  const username = userInfo?.username
  return (
    <header>
      <h1 className="logo">Blog</h1>
      <nav>
        {username && (
          <>
            <Link to="/" >MyBlogs</Link>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}


      </nav>
    </header>
  )
}
