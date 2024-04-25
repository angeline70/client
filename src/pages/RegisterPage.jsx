import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  async function register(ev) {
    try {
      ev.preventDefault();
      await fetch('http://localhost:5001/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      // Registration succeeded
      alert('Registration successful');
      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      // Registration failed
      alert('Registration failed');
      console.error('Error during registration:', error);
    }
  }

  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder='username'
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder='password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
