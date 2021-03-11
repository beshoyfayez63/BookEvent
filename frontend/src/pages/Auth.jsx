import { useState } from 'react';

import Spinner from '../components/UI/Spinner';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '../util/validation';

import { useDispatch, useSelector } from 'react-redux';
import { authFetchData, loading, error } from '../store/user/user-slice';
import { loginQuery, signupQuery } from '../util/graphql-queries';

import './Auth.css';

function Auth() {
  const [formStatus, setFormStatus] = useState('login');

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(authSchema),
  });

  const dispatch = useDispatch();
  const authSubmit = (data) => dispatch(authFetchData(data, formStatus));

  const loadingData = useSelector(loading);
  const loginError = useSelector(error);

  const changeFormStatus = () => {
    formStatus === 'signup' ? setFormStatus('login') : setFormStatus('signup');
  };

  const handleAuthSubmit = (data) => {
    console.log(data);
    let requestBody;
    if (formStatus === 'login') {
      requestBody = loginQuery(data);
    } else {
      requestBody = signupQuery(data);
    }

    authSubmit(requestBody);
  };
  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)} className='auth-form'>
      {loginError && <p className='error-message'>{loginError}</p>}
      <div className='form-control'>
        <label htmlFor='email'>E-Mail</label>
        <input
          type='email'
          id='email'
          name='email'
          ref={register}
          className={errors && errors.email && 'error'}
        />
        {errors && errors.email && (
          <p className='error-message'>{errors.email.message}</p>
        )}
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          ref={register}
          className={errors && errors.password && 'error'}
        />
        {errors && errors.password && (
          <p className='error-message'>{errors.password.message}</p>
        )}
      </div>
      <div className='form-actions'>
        <button type='button' onClick={changeFormStatus}>
          Switch To {formStatus === 'login' ? 'Signup' : 'Login'}
        </button>

        <button type='submit' disabled={!isValid || loadingData}>
          {formStatus === 'login' ? 'Login' : 'Signup'}{' '}
          {loadingData && (
            <span className='auth-loading'>
              <Spinner
                width='20px'
                height='20px'
                afterWidth='20px'
                afterHeight='20px'
                margin='auto'
              />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

export default Auth;
