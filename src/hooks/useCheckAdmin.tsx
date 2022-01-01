import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../interfaces/interface';

const UseCheckAdmin = () => {
  const [checkAdmin, setCheckAdmin] = React.useState<boolean>(false);
  const currentUser = useSelector(
    (state: State) => state.currentUser.currentUser
  );
  console.log(currentUser);
  React.useEffect(() => {
    if (currentUser && currentUser.rules === 'admin') {
      setCheckAdmin(true);
      return;
    }
    setCheckAdmin(false);
    return;
  }, [currentUser]);
  console.log(checkAdmin);
  return checkAdmin;
};

export default UseCheckAdmin;
