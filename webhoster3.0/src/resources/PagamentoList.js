import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../server";
import AuthContext from "../components/authContext";

const PagamentoList = () => {
  const { authenticated } = useContext(AuthContext);
  const [pagamentos, setPagamentos] = useState([]);
  const [filteredPagamentos, setFilteredPagamentos] = useState([]);

  const [searchValor, setSearchValor] = useState("");
  const [searchMetodoDePagamento, setSearchMetodoDePagamento] = useState("");
  const [searchNumeroDeTransacao, setSearchNumeroDeTransacao] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagamentosResult = await api.get("/pagamento");
        const pagamentosData = pagamentosResult.data;

        setPagamentos(pagamentosData);
        setFilteredPagamentos(pagamentosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterPagamentos = () => {
      let filtered = [...pagamentos];

      if (searchValor) {
        filtered = filtered.filter((pagamento) =>
          pagamento.valor.toString().toLowerCase().includes(searchValor.toLowerCase())
        );
      }

      if (searchMetodoDePagamento) {
        filtered = filtered.filter((pagamento) =>
          pagamento.metodo_de_pagamento.toLowerCase().includes(searchMetodoDePagamento.toLowerCase())
        );
      }

      if (searchNumeroDeTransacao) {
        filtered = filtered.filter((pagamento) =>
          pagamento.numero_de_transacao.toLowerCase().includes(searchNumeroDeTransacao.toLowerCase())
        );
      }

      setFilteredPagamentos(filtered);
    };

    filterPagamentos();
  }, [searchValor, searchMetodoDePagamento, searchNumeroDeTransacao, pagamentos]);

  const deletePagamento = async (id) => {
    try {
      await api.delete(`/pagamento/${id}`);
      setPagamentos(pagamentos.filter((pagamento) => pagamento.id !== id));
      setFilteredPagamentos(filteredPagamentos.filter((pagamento) => pagamento.id !== id));
    } catch (error) {
      console.error("Error deleting pagamento:", error);
    }
  };

  return (
    <div className="pagamento-list">
      <h1>Pagamentos</h1>
      <div className="filters">
        <label>
          Valor:
          <input
            type="text"
            value={searchValor}
            onChange={(e) => setSearchValor(e.target.value)}
          />
        </label>
        <label>
          Método de Pagamento:
          <input
            type="text"
            value={searchMetodoDePagamento}
            onChange={(e) => setSearchMetodoDePagamento(e.target.value)}
          />
        </label>
        <label>
          Número de Transação:
          <input
            type="text"
            value={searchNumeroDeTransacao}
            onChange={(e) => setSearchNumeroDeTransacao(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/pagamento/new" className="new-pagamento">
            Novo Pagamento
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Método de Pagamento</th>
            <th>Número de Transação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPagamentos.map((pagamento) => (
            <tr key={pagamento.id}>
              <td>{pagamento.valor}</td>
              <td>{pagamento.metodo_de_pagamento}</td>
              <td>{pagamento.numero_de_transacao}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/pagamento/edit/${pagamento.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deletePagamento(pagamento.id)} className="delete-btn">
                      Apagar
                    </button>
                  </>
                ) : (
                  <p>Autenticação necessária</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagamentoList;
