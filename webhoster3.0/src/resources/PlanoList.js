import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlanoList() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    axios.get('/api/plano')
      .then(response => {
        setPlanos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the plans!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/plano/${id}`)
      .then(() => {
        setPlanos(planos.filter(plano => plano.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the plan!", error);
      });
  };

  return (
    <div>
      <h2>Lista de Planos</h2>
      <Link to="/plano/novo">Adicionar Plano</Link>
      <ul>
        {planos.map(plano => (
          <li key={plano.id}>
            {plano.nome}
            <Link to={`/plano/editar/${plano.id}`}>Editar</Link>
            <button onClick={() => handleDelete(plano.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanoList;
