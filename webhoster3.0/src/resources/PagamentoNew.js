import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../server";
 
const PagamentoNew = () => {

  const navigate = useNavigate();

  const [pagamento, setPagamento] = useState({

    valor: "",
    metodo_de_pagamento: "",
    numero_de_transacao: "",
    data: "",

  });
 
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

          <input type="number" step="0.01" name="valor" value={pagamento.valor} onChange={handleInputChange} />

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

        <Link to="/pagamentos" className="cancel-btn">Cancelar</Link>

      </form>

    </div>

  );

};
 
export default PagamentoNew;
