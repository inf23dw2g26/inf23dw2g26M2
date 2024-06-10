import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../server";

const ClienteEdit = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    nome: "",
    tipo_de_conta: "",
    contacto: "",
    numero_fiscal: "",
    email: "",
    plano: "",
    periodicidade_de_pagamento: "",
    data_ultimo_pagamento: "",
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/cliente/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Error fetching cliente:", error);
      }
    };

    fetchCliente();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/cliente/${id}`, cliente);
    } catch (error) {
      console.error("Error updating cliente:", error);
    }
  };

  return (
    <div>
      <h2>Editando Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Cliente:
          <input type="text" name="nome" value={cliente.nome} onChange={handleInputChange} />
        </label>
        {/* Adicione outros campos do cliente aqui */}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ClienteEdit;
