import React, { useEffect, useContext } from 'react';
import './App.css';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import { gapi } from 'gapi-script';
import AuthContext from "./components/authContext";


const clientId = "146954126349-jlp6bek411g29mj7dl27p70mssiihf9v.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start);
  });

  const { authenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <div>{authenticated ? (
      <LogoutButton />
        ) : (
      <LoginButton />
        )}
        </div>
    </div>
  );
}

export default App;
