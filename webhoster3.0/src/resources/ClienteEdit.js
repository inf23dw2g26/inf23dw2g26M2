import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../server";

const ClienteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        setCliente({
          ...response.data,
          periodicidade_de_pagamento: response.data.periodicidade_de_pagamento.replace("T", " ").split(":").slice(0, 2).join(":"),
          data_ultimo_pagamento: response.data.data_ultimo_pagamento.replace("T", " ").split(":").slice(0, 2).join(":")
        });
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
      navigate("/cliente");
    } catch (error) {
      console.error("Error updating cliente:", error);
    }
  };

  return (
    <div className="cliente-edit">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Cliente:
          <input type="text" name="nome" value={cliente.nome} onChange={handleInputChange} />
        </label>
        <label>
          Tipo de Conta:
          <input type="text" name="tipo_de_conta" value={cliente.tipo_de_conta} onChange={handleInputChange} />
        </label>
        <label>
          Contacto do Cliente:
          <input type="text" name="contacto" value={cliente.contacto} onChange={handleInputChange} />
        </label>
        <label>
          NIF:
          <input type="text" name="numero_fiscal" value={cliente.numero_fiscal} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={cliente.email} onChange={handleInputChange} />
        </label>
        <label>
          Plano:
          <input type="text" name="plano" value={cliente.plano} onChange={handleInputChange} />
        </label>
        <label>
          Periodicidade de Pagamento:
          <input type="text" name="periodicidade_de_pagamento" value={cliente.periodicidade_de_pagamento} onChange={handleInputChange} />
        </label>
        <label>
          Data do último Pagamento:
          <input type="text" name="data_ultimo_pagamento" value={cliente.data_ultimo_pagamento} onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/clientes" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default ClienteEdit;