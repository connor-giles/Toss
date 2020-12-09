import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId =
    '118478485284-2ging11n4fo1c8drq6976espjd1140rq.apps.googleusercontent.com';

function GoogleLogoutHook() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default GoogleLogoutHook;