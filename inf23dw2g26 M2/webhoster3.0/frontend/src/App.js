import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import PagamentoForm from './components/PagamentoForm';
import PagamentoList from './components/PagamentoList';
import DominioForm from './components/DominioForm';
import DominioList from './components/DominioList';
import PlanoForm from './components/PlanoForm';
import PlanoList from './components/PlanoList';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/clientes" component={ClienteList} />
          <Route path="/cliente/novo" component={ClienteForm} />
          <Route path="/cliente/editar/:id" component={ClienteForm} />
          <Route path="/pagamentos" component={PagamentoList} />
          <Route path="/pagamento/novo" component={PagamentoForm} />
          <Route path="/pagamento/editar/:id" component={PagamentoForm} />
          <Route path="/dominios" component={DominioList} />
          <Route path="/dominio/novo" component={DominioForm} />
          <Route path="/dominio/editar/:id" component={DominioForm} />
          <Route path="/planos" component={PlanoList} />
          <Route path="/plano/novo" component={PlanoForm} />
          <Route path="/plano/editar/:id" component={PlanoForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/" component={ClienteList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
