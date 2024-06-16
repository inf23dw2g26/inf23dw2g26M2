import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function PagamentoForm() {
  const { id } = useParams();
  const history = useHistory();
  const [pagamento, setPagamento] = useState({
    cliente_id: '',
    valor: '',
    data_pagamento: '',
    metodo_pagamento: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/pagamento/${id}`)
        .then(response => {
          setPagamento(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the payment!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setPagamento({
      ...pagamento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/pagamento/${id}`, pagamento)
        .then(() => {
          history.push('/pagamentos');
        })
        .catch(error => {
          console.error("There was an error updating the payment!", error);
        });
    } else {
      axios.post('/api/pagamento', pagamento)
        .then(() => {
          history.push('/pagamentos');
        })
        .catch(error => {
          console.error("There was an error creating the payment!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Pagamento' : 'Adicionar Pagamento'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cliente_id" value={pagamento.cliente_id} onChange={handleChange} placeholder="Cliente ID" />
        <input type="number" name="valor" value={pagamento.valor} onChange={handleChange} placeholder="Valor" />
        <input type="date" name="data_pagamento" value={pagamento.data_pagamento} onChange={handleChange} placeholder="Data Pagamento" />
        <input type="text" name="metodo_pagamento" value={pagamento.metodo_pagamento} onChange={handleChange} placeholder="Método Pagamento" />
        <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
}

export default PagamentoForm;
