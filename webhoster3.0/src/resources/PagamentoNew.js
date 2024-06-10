import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../server";

const PagamentoNew = () => {
  const navigate = useNavigate();
  const [pagamento, setPagamento] = useState({
    valor: "",
    metodo_de_pagamento: "",
    numero_de_transacao: "",
    cliente: "",
  });

  useEffect(() => {
    const fetchLastCliente = async () => {
      try {
        const response = await api.get("/cliente?_sort=id&_order=desc&_limit=1");
        const lastCliente = response.data[0];
        if (lastCliente) {
          setPagamento((prevState) => ({ ...prevState, cliente: lastCliente.id }));
        }
      } catch (error) {
        console.error("Error fetching last cliente:", error);
      }
    };

    fetchLastCliente();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPagamento({ ...pagamento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pagamento", pagamento);
      navigate("/pagamentos");
    } catch (error) {
      console.error("Error creating pagamento:", error);
    }
  };

  return (
    <div className="pagamento-new">
      <h2>Novo Pagamento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Valor:
          <input type="number" step="0.01" name="valor" value={pagamento.valor} onChange={handleInputChange} required />
        </label>
        <label>
          Método de Pagamento:
          <input type="text" name="metodo_de_pagamento" value={pagamento.metodo_de_pagamento} onChange={handleInputChange} required />
        </label>
        <label>
          Número de Transação:
          <input type="text" name="numero_de_transacao" value={pagamento.numero_de_transacao} onChange={handleInputChange} required />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/pagamentos" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default PagamentoNew;