import React, { useState } from 'react';
import { getUserForEmail, setUserForEmail } from '../utils/api';

const Profile = ({ setUser }) => {
  const [stage, setStage] = useState('email');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const confirm = async (event) => {
    event.preventDefault();
    if (stage === 'email') {
      getUserForEmail(email).then((result) => {
        if (result && result.userName) {
          setUser({
            userName: result.userName,
            email,
          });
        } else {
          setStage('userName');
        }
      });
      setStage('loading');
    } else if (stage === 'userName') {
      setUserForEmail({ email, userName }).then((result) => {
        if (result && result.error) {
          setError(result.error);
          setStage('userName');
        } else {
          setUser({
            userName,
            email,
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
          <h1>Username</h1>
          {error && (
            <p className="error">{error}</p>
          )}
          <input type="text" name="userName" value={userName} onChange={userNameChange} />
          <input type="submit" value="Submit" disabled={!userName} />
        </>
      )}
      {stage === 'email' && (
        <>
          <h1>Email</h1>
          <input type="text" name="email" value={email} onChange={emailChange} />
          <input type="submit" value="Next" disabled={!email} />
        </>
      )}
    </form>
  );
};

export default Profile;
