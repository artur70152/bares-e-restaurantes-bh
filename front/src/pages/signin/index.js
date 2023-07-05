import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../funcionalidades/actions';
import history from '../../services/history';

const Signin = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInRequest(email,password))
  };
  const handleGoToLogin = () => {
    history.push('/signup');
    history.go('/signup'); // Substitua '/login' pela rota para a página de login desejada
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
       
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <button type="submit">Sign In</button>

      </form>
      <button type="submit" onClick={handleGoToLogin}>nao tenho conta</button>
    </div>
  );
};

export default Signin;