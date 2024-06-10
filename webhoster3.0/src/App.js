import React, { useEffect, useContext } from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import { AuthProvider } from "./components/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from './components/topbar';
import ClienteList from './resources/ClienteList';
import ClienteEdit from './resources/ClienteEdit';
import DominioList from './resources/DominioList';
import PagamentoList from './resources/PagamentoList';
import PlanoList from './resources/PlanoList';


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
          <Routes>
            <Route path="/"/>
            <Route path="/pagamento" element={<PagamentoList/>} />
            <Route path="/pagamento/new/*" />
            <Route path="/pagamento/edit/:id/*"/>
            <Route path="/cliente" element={<ClienteList/>} />
            <Route path="/cliente/new/*"/>
            <Route path="/cliente/edit/:id/*" element={<ClienteEdit/>} />
            <Route path="/dominio" element={<DominioList/>} />
            <Route path="/dominio/new/*"/>
            <Route path="/dominio/edit/:id/*"/>
            <Route path="/plano" element={<PlanoList/>} />
            <Route path="/plano/new/*"/>
            <Route path="/plano/edit/:id/*"/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

//usar element depois de path para definir a variavel a ser chamada
