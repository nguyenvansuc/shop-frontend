import React from 'react';
import SubmitButton from '../../common/button/SubmitButton';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import userApi from '../../app/api/userApi';

interface Props {}
interface DataSignUp {
  username: string;
  password: string;
  passwordAgain: string;
}

const SignUp = (props: Props) => {
  let [note, setNote] = React.useState<string | null>(null);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: DataSignUp): void => {
    console.log(data);
    if (data?.password !== data?.passwordAgain) {
      setNote('The passwordAgain is incorrect!');
      return;
    }
    const createUser = async () => {
      const newUser = { username: data.username, password: data.password };
      const result = await userApi.createUser(newUser);
      setNote(result);
    };
    createUser();
  };
  return (
    <div className="signUp">
      <form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in with your account :</h1>
        <div className="signUpUsername">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            {...register('username')}
          />
        </div>
        <div className="signUpPassword">
          <label>Password:</label>
          <input
            type="text"
            placeholder="Enter your password"
            {...register('password')}
          />
        </div>
        <div className="signUpPasswordAgain">
          <label>Password:</label>
          <input
            type="text"
            placeholder="Enter your password again"
            {...register('passwordAgain')}
          />
        </div>
        <div style={{ textAlign: 'start' }}>Note: {note}</div>
        <div>
          <SubmitButton title={'Sign Up'} />
        </div>
        <h3
          onClick={() => {
            history.push('/signIn');
          }}
        >
          Back to Sign In
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
