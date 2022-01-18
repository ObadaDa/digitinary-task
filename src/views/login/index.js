import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { useNavigate } from 'react-router-dom';

import Api from '../../helpers/api';
import UserSession from '../../helpers/userSession';

import './styles.scss';

export default function Login() {
  const navigate = useNavigate();

  const getUserData = email => {
    const api = new Api();
    api.getUserByEmail(email)
      .then((response) => {
        UserSession.setUser(response.data[0]);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const userEmailCookie = UserSession.getUserEmail();
    if(userEmailCookie) {
      getUserData(userEmailCookie.split('=')[1])
    }
  })

  const onSubmit = e => {
    e.preventDefault();
    getUserData(e.target[0].value);
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={onSubmit}>
        <FormControl>
          <InputLabel htmlFor='email'>
            Email
          </InputLabel>
          <Input
            id='email'
            type='text'
          />
        </FormControl>
        <Button color='primary' type='submit'>
          Log in
        </Button>
      </form>
    </div>
  );
}