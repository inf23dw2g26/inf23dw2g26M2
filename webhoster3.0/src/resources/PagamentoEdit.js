import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../server";

const PagamentoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagamento, setPagamento] = useState({
    valor: "",
    metodo_de_pagamento: "",
    numero_de_transacao: "",
    data: "",
  });

  useEffect(() => {
    const fetchPagamento = async () => {
      try {
        const response = await api.get(`/pagamento/${id}`);
        setPagamento(response.data);
      } catch (error) {
        console.error("Error fetching pagamento:", error);
      }
    };

    fetchPagamento();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPagamento({ ...pagamento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pagamento/${id}`, pagamento);
      navigate("/pagamento");
    } catch (error) {
      console.error("Error updating pagamento:", error);
    }
  };

  return (
    <div className="pagamento-edit">
      <h2>Editar Pagamento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Valor:
          <input type="number" name="valor" value={pagamento.valor} onChange={handleInputChange} />
        </label>
        <label>
          Método de Pagamento:
          <input type="text" name="metodo_de_pagamento" value={pagamento.metodo_de_pagamento} onChange={handleInputChange} />
        </label>
        <label>
          Número de Transação:
          <input type="text" name="numero_de_transacao" value={pagamento.numero_de_transacao} onChange={handleInputChange} />
        </label>
        <label>
          Data:
          <input type="datetime-local" name="data" value={pagamento.data} onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/pagamento" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default PagamentoEdit;
