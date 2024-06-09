import React, { useEffect, useContext } from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import { AuthProvider } from "./components/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from './components/topbar';


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

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <TopBar />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
