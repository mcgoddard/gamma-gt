import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import UserContext from '../utils/UserContext';
import clientId from '../utils/oauth-client-id';

const SignOut = () => {
  const setUser = useContext(UserContext)[1];
  const onSuccess = () => {
    setUser(null);
  };

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Sign Out"
      onLogoutSuccess={onSuccess}
    />
  );
};

export default SignOut;
