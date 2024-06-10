import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../server";

const PlanoNew = () => {
  const navigate = useNavigate();
  const [plano, setPlano] = useState({
    tipo_de_plano: "",
    periodicidade: "",
    preco: "",
    armazenamento: "",
    numero_de_contas_email: "",
    numero_de_dominios: "",
    largura_de_banda: "",
    fidelizacao: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlano({ ...plano, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/plano", plano);
      navigate("/plano");
    } catch (error) {
      console.error("Error creating plano:", error);
    }
  };

  return (
    <div className="plano-new">
      <h2>Novo Plano</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de Plano:
          <input type="text" name="tipo_de_plano" value={plano.tipo_de_plano} onChange={handleInputChange} />
        </label>
        <label>
          Periodicidade:
          <input type="text" name="periodicidade" value={plano.periodicidade} onChange={handleInputChange} />
        </label>
        <label>
          Preço:
          <input type="number" step="0.01" name="preco" value={plano.preco} onChange={handleInputChange} />
        </label>
        <label>
          Armazenamento:
          <input type="text" name="armazenamento" value={plano.armazenamento} onChange={handleInputChange} />
        </label>
        <label>
          Número de Contas de Email:
          <input type="number" name="numero_de_contas_email" value={plano.numero_de_contas_email} onChange={handleInputChange} />
        </label>
        <label>
          Número de Domínios:
          <input type="number" name="numero_de_dominios" value={plano.numero_de_dominios} onChange={handleInputChange} />
        </label>
        <label>
          Largura de Banda:
          <input type="text" name="largura_de_banda" value={plano.largura_de_banda} onChange={handleInputChange} />
        </label>
        <label>
          Fidelização:
          <input type="text" name="fidelizacao" value={plano.fidelizacao} onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/plano" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default PlanoNew;