import React, { useState } from "react";
import api from "../server";
 
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteDetalhe, setClienteDetalhe] = useState(null);
 
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/clientes?nome_like=${searchQuery}`);
      setClientes(response.data);
    } catch (error) {
      console.error("Error searching clientes:", error);
    }
  };
 
  const fetchClienteDetalhe = async (id) => {
    try {
      const response = await api.get(`/cliente/${id}`);
      setClienteDetalhe(response.data);
    } catch (error) {
      console.error("Error fetching cliente detail:", error);
    }
  };
 
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <form onSubmit={handleSearch}>
        <label>
          Procurar Cliente:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button type="submit">Procurar</button>
      </form>
 
      <div className="cliente-list">
        <h3>Clientes</h3>
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id} onClick={() => fetchClienteDetalhe(cliente.id)}>
              {cliente.nome}
            </li>
          ))}
        </ul>
      </div>
 
      {clienteDetalhe && (
        <div className="cliente-detalhe">
          <h3>Detalhes do Cliente</h3>
          <p><strong>Nome:</strong> {clienteDetalhe.nome}</p>
          <p><strong>Tipo de Conta:</strong> {clienteDetalhe.tipo_de_conta}</p>
          <p><strong>Número Fiscal:</strong> {clienteDetalhe.numero_fiscal}</p>
          <p><strong>Email:</strong> {clienteDetalhe.email}</p>
          <p><strong>Contacto:</strong> {clienteDetalhe.contacto}</p>
          <p><strong>Plano:</strong> {clienteDetalhe.plano}</p>
          <p><strong>Periodicidade de Pagamento:</strong> {clienteDetalhe.periodicidade_de_pagamento}</p>
          <p><strong>Data do Último Pagamento:</strong> {new Date(clienteDetalhe.data_ultimo_pagamento).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};
 
export default Dashboard;