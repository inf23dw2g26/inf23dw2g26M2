import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../server";
 
const ClienteNew = () => {
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
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cliente", cliente);
      navigate("/cliente");
    } catch (error) {
      console.error("Error creating cliente:", error);
    }
  };
 
  return (
<div className="cliente-new">
<h2>Novo Cliente</h2>
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
<input type="datetime-local" name="data_ultimo_pagamento" value={cliente.data_ultimo_pagamento} onChange={handleInputChange} />
</label>
<button type="submit">Guardar</button>
<Link to="/cliente" className="cancel-btn">Cancelar</Link>
</form>
</div>
  );
};
 
export default ClienteNew;