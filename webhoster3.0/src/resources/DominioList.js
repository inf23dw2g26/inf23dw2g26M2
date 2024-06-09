import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DominioList() {
  const [dominios, setDominios] = useState([]);

  useEffect(() => {
    axios.get('/api/dominio')
      .then(response => {
        setDominios(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the domains!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/dominio/${id}`)
      .then(() => {
        setDominios(dominios.filter(dominio => dominio.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the domain!", error);
      });
  };

  return (
    <div>
      <h2>Lista de Domínios</h2>
      <Link to="/dominio/novo">Adicionar Domínio</Link>
      <ul>
        {dominios.map(dominio => (
          <li key={dominio.id}>
            {dominio.nome}
            <Link to={`/dominio/editar/${dominio.id}`}>Editar</Link>
            <button onClick={() => handleDelete(dominio.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DominioList;
