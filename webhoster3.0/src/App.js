import React, { useEffect, useContext } from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import { AuthProvider } from "./components/authContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from './components/topbar';
import ClienteList from './resources/ClienteList';
import ClienteEdit from './resources/ClienteEdit';
import ClienteNew from './resources/ClienteNew';
import DominioList from './resources/DominioList';
import DominioEdit from './resources/DominioEdit';
import DominioNew from './resources/DominioNew';
import PagamentoList from './resources/PagamentoList';
import PlanoList from './resources/PlanoList';
import PlanoEdit from './resources/PlanoEdit';
import PlanoNew from './resources/PlanoNew';
import PagamentoEdit from './resources/PagamentoEdit';
import PagamentoNew from './resources/PagamentoNew';
import Dashboard from './resources/Dashboard';


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
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/pagamento" element={<PagamentoList/>} />
            <Route path="/pagamento/new/*" element={<PagamentoNew/>}/>
            <Route path="/pagamento/edit/:id/*" element={<PagamentoEdit/>}/>
            <Route path="/cliente" element={<ClienteList/>} />
            <Route path="/cliente/new/*" element={<ClienteNew/>}/>
            <Route path="/cliente/edit/:id/*" element={<ClienteEdit/>} />
            <Route path="/dominio" element={<DominioList/>} />
            <Route path="/dominio/new/*" element={<DominioNew/>}/>
            <Route path="/dominio/edit/:id/*" element={<DominioEdit/>}/>
            <Route path="/plano" element={<PlanoList/>} />
            <Route path="/plano/new/*" element={<PlanoNew/>}/>
            <Route path="/plano/edit/:id/*" element={<PlanoEdit/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;