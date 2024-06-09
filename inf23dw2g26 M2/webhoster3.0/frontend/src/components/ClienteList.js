import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClienteList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('/api/cliente')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the clients!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/cliente/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the client!", error);
      });
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <Link to="/cliente/novo">Adicionar Cliente</Link>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nome}
            <Link to={`/cliente/editar/${cliente.id}`}>Editar</Link>
            <button onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClienteList;
