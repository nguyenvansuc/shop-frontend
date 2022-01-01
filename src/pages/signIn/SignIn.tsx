import React from 'react';
import SubmitButton from '../../common/button/SubmitButton';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import userApi from '../../app/api/userApi';
import { UserSignIn } from '../../interfaces/interface';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from '../currentUserSlice';
import { useDispatch } from 'react-redux';

// interface Props {}

const SignIn = (props: any) => {
  const dispatch = useDispatch();
  const [note, setNote] = React.useState<string | null>(null);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  console.log(handleSubmit);
  const onSubmit = (data: UserSignIn): void => {
    const getUser = async () => {
      const result = await userApi.getUser(data);
      const token = result?.token;
      if (token) {
        var userDecoded = jwt_decode(token);
        dispatch(
          setCurrentUser({ isSignedIn: true, currentUser: userDecoded })
        );
        history.push('/home');
        return;
      }
      console.log(result, 'result');
      setNote(result?.message);
    };
    getUser();
  };
  return (
    <div className="signIn">
      <form className="signInForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in with your account :</h1>
        <div className="signInUsername">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            {...register('username')}
          />
        </div>
        <div className="signInPassword">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
        </div>
        <div style={{ textAlign: 'start' }}>Note: {note}</div>
        <div>
          <SubmitButton title={'Sign In'} />
        </div>
        <h3
          onClick={() => {
            history.push('/signUp');
          }}
        >
          Sign up now !
        </h3>
      </form>
    </div>
  );
};

export default SignIn;
