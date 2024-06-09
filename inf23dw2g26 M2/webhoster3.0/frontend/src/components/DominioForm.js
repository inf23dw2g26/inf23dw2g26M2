import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function DominioForm() {
  const { id } = useParams();
  const history = useHistory();
  const [dominio, setDominio] = useState({
    nome: '',
    cliente_id: '',
    plano: '',
    data_registro: '',
    data_expiracao: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/dominio/${id}`)
        .then(response => {
          setDominio(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the domain!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setDominio({
      ...dominio,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/dominio/${id}`, dominio)
        .then(() => {
          history.push('/dominios');
        })
        .catch(error => {
          console.error("There was an error updating the domain!", error);
        });
    } else {
      axios.post('/api/dominio', dominio)
        .then(() => {
          history.push('/dominios');
        })
        .catch(error => {
          console.error("There was an error creating the domain!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Domínio' : 'Adicionar Domínio'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={dominio.nome} onChange={handleChange} placeholder="Nome" />
        <input type="text" name="cliente_id" value={dominio.cliente_id} onChange={handleChange} placeholder="Cliente ID" />
        <input type="text" name="plano" value={dominio.plano} onChange={handleChange} placeholder="Plano" />
        <input type="date" name="data_registro" value={dominio.data_registro} onChange={handleChange} placeholder="Data Registro" />
        <input type="date" name="data_expiracao" value={dominio.data_expiracao} onChange={handleChange} placeholder="Data Expiração" />
        <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
}

export default DominioForm;
