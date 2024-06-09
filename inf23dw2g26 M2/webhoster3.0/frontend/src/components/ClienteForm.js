import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function ClienteForm() {
  const { id } = useParams();
  const history = useHistory();
  const [cliente, setCliente] = useState({
    nome: '',
    tipo_de_conta: '',
    numero_fiscal: '',
    email: '',
    contacto: '',
    plano: '',
    periodicidade_de_pagamento: '',
    data_ultimo_pagamento: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/cliente/${id}`)
        .then(response => {
          setCliente(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the client!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/cliente/${id}`, cliente)
        .then(() => {
          history.push('/clientes');
        })
        .catch(error => {
          console.error("There was an error updating the client!", error);
        });
    } else {
      axios.post('/api/cliente', cliente)
        .then(() => {
          history.push('/clientes');
        })
        .catch(error => {
          console.error("There was an error creating the client!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={cliente.nome} onChange={handleChange} placeholder="Nome" />
        <input type="text" name="tipo_de_conta" value={cliente.tipo_de_conta} onChange={handleChange} placeholder="Tipo de Conta" />
        <input type="text" name="numero_fiscal" value={cliente.numero_fiscal} onChange={handleChange} placeholder="Número Fiscal" />
        <input type="email" name="email" value={cliente.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="contacto" value={cliente.contacto} onChange={handleChange} placeholder="Contacto" />
        <input type="text" name="plano" value={cliente.plano} onChange={handleChange} placeholder="Plano" />
        <input type="text" name="periodicidade_de_pagamento" value={cliente.periodicidade_de_pagamento} onChange={handleChange} placeholder="Periodicidade de Pagamento" />
        <input type="date" name="data_ultimo_pagamento" value={cliente.data_ultimo_pagamento} onChange={handleChange} placeholder="Data Último Pagamento" />
        <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
}

export default ClienteForm;
