const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '659507812998-lpkpauui51s1ksa84c4qm77ap56tdoge.apps.googleusercontent.com';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload.email;
};

const verifyEmail = async (email, token) => {
  const tokenEmail = await googleAuth(token);
  return email === tokenEmail;
};

module.exports = {
  verifyEmail,
  googleAuth,
};
