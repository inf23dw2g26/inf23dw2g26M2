import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PagamentoList() {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    axios.get('/api/pagamento')
      .then(response => {
        setPagamentos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the payments!", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/pagamento/${id}`)
      .then(() => {
        setPagamentos(pagamentos.filter(pagamento => pagamento.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the payment!", error);
      });
  };

  return (
    <div>
      <h2>Lista de Pagamentos</h2>
      <Link to="/pagamento/novo">Adicionar Pagamento</Link>
      <ul>
        {pagamentos.map(pagamento => (
          <li key={pagamento.id}>
            {pagamento.cliente_id} - {pagamento.valor}
            <Link to={`/pagamento/editar/${pagamento.id}`}>Editar</Link>
            <button onClick={() => handleDelete(pagamento.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PagamentoList;
