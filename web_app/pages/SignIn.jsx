import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import UserContext from '../utils/UserContext';
import clientId from '../utils/oauth-client-id';

const refreshTokenSetup = (res, setUser, user) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    console.log(`New auth response: ${newAuthRes}`);
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setUser({
      ...user,
      token: newAuthRes.id_token,
    });
    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

const SignIn = () => {
  const setUser = useContext(UserContext)[1];

  const onSuccess = (res) => {
    const user = {
      token: res.tokenId,
      email: res.profileObj.email,
    };
    setUser(user);

    refreshTokenSetup(res, setUser, user);
  };

  const onFailure = (res) => {
    alert(`Login failed: ${JSON.stringify(res)}`);
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign In"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn
      />
    </div>
  );
};

export default SignIn;
