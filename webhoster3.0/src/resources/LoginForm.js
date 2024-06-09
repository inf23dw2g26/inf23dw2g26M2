import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', credentials)
      .then(response => {
        // Assuming the response contains a token or some form of user authentication
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch(error => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
