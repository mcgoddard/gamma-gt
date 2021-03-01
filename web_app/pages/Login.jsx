import React, { useState, useContext } from 'react';
import UserContext from '../utils/UserContext';
import { getUserForEmail, setUserForEmail } from '../utils/api';

const alphanumeric = /^[0-9a-zA-Z]+$/;

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [stage, setStage] = useState('loading');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const userNameChange = (event) => {
    if (event.target.value.match(alphanumeric)) {
      setUserName(event.target.value);
    }
  };

  getUserForEmail(user.email, user.token).then((result) => {
    if (result && result.userName) {
      setUser({
        ...user,
        userName: result.userName,
      });
    } else {
      setStage('userName');
    }
  });

  const confirm = async (event) => {
    event.preventDefault();
    if (stage === 'userName') {
      setUserForEmail({ email: user.email, userName }, user.token).then((result) => {
        if (result && result.error) {
          setError(result.error);
          setStage('userName');
        } else {
          setUser({
            ...user,
            userName,
          });
        }
      });
      setStage('loading');
    }
  };

  if (stage === 'loading') {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <form onSubmit={confirm}>
      {stage === 'userName' && (
        <>
          <h1>Create username</h1>
          {error && (
            <p className="error">{error}</p>
          )}
          <input type="text" name="userName" value={userName} onChange={userNameChange} />
          <input type="submit" value="Submit" disabled={!userName} />
          <p>Once you've created your account contact Mike to verify your email</p>
        </>
      )}
    </form>
  );
};

export default Profile;
