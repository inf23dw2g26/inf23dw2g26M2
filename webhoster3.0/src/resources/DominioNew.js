import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../server";

const DominioNew = () => {
  const navigate = useNavigate();
  const [dominio, setDominio] = useState({
    nome: "",
    codigo_TLD: "",
    estado: false,
    data_de_inicio: "",
    data_de_fim: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDominio({ ...dominio, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDominio({ ...dominio, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/dominio", dominio);
      navigate("/dominios");
    } catch (error) {
      console.error("Error creating dominio:", error);
    }
  };

  return (
    <div className="dominio-new">
      <h2>Novo Domínio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Domínio:
          <input type="text" name="nome" value={dominio.nome} onChange={handleInputChange} />
        </label>
        <label>
          Código TLD:
          <input type="text" name="codigo_TLD" value={dominio.codigo_TLD} onChange={handleInputChange} />
        </label>
        <label>
          Estado:
          <input type="checkbox" name="estado" checked={dominio.estado} onChange={handleCheckboxChange} />
        </label>
        <label>
          Data de Início:
          <input type="datetime-local" name="data_de_inicio" value={dominio.data_de_inicio} onChange={handleInputChange} />
        </label>
        <label>
          Data de Fim:
          <input type="datetime-local" name="data_de_fim" value={dominio.data_de_fim} onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/dominios" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default DominioNew;