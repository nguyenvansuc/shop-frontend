import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import checkAdmin from '../helpers/checkAdmin';
import { State } from '../interfaces/interface';
import useCheckAdmin from '../hooks/useCheckAdmin';

interface Props extends RouteProps {
  path: string;
  location?: any;
  component: any;
}

const PrivateRoute = (props: Props) => {
  const currentUser = useSelector(
    (state: State) => state?.currentUser?.currentUser
  );
  const checkRulesAdmin = useCheckAdmin();
  console.log(checkRulesAdmin, 'router');
  if (!(currentUser && currentUser.rules === 'admin')) {
    return (
      <Redirect
        to={{
          pathname: '/home',
          state: { from: props.location },
        }}
      />
    );
  }
  return <Route {...props} />;
};

export default PrivateRoute;
