import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function PlanoForm() {
  const { id } = useParams();
  const history = useHistory();
  const [plano, setPlano] = useState({
    nome: '',
    descricao: '',
    valor: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/plano/${id}`)
        .then(response => {
          setPlano(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the plan!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setPlano({
      ...plano,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/plano/${id}`, plano)
        .then(() => {
          history.push('/planos');
        })
        .catch(error => {
          console.error("There was an error updating the plan!", error);
        });
    } else {
      axios.post('/api/plano', plano)
        .then(() => {
          history.push('/planos');
        })
        .catch(error => {
          console.error("There was an error creating the plan!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Plano' : 'Adicionar Plano'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={plano.nome} onChange={handleChange} placeholder="Nome" />
        <input type="text" name="descricao" value={plano.descricao} onChange={handleChange} placeholder="Descrição" />
        <input type="number" name="valor" value={plano.valor} onChange={handleChange} placeholder="Valor" />
        <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
}

export default PlanoForm;
