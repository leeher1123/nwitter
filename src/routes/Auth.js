import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from 'fBase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!newAccount) {
      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (e) {
        const errorMessage = e.message;
        setError(errorMessage);
      }
    } else {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        const errorMessage = e.message;
        setError(errorMessage);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (e) => {
    let provider;
    const {
      target: { name },
    } = e;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? 'Log In' : 'Create Account'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Create Account' : 'Log In'}
      </span>
      <div>
        <button onClick={onSocialClick} name='google'>
          Continue with Google
        </button>
        <button onClick={onSocialClick} name='github'>
          Continue with Github
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div``;

export default Auth;
