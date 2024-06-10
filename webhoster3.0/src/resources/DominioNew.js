import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../server";

const DominioNew = () => {
  const navigate = useNavigate();
  const [dominio, setDominio] = useState({
    nome: "",
    codigo_TLD: "",
    estado: false,
    data_de_inicio: "",
    data_de_fim: "",
    cliente: "",
  });

  useEffect(() => {
    const fetchLastCliente = async () => {
      try {
        const response = await api.get("/cliente?_sort=id&_order=desc&_limit=1");
        const lastCliente = response.data[0];
        if (lastCliente) {
          setDominio((prevState) => ({ ...prevState, cliente: lastCliente.id }));
        }
      } catch (error) {
        console.error("Error fetching last cliente:", error);
      }
    };

    fetchLastCliente();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDominio({ ...dominio, [name]: type === "checkbox" ? checked : value });
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
      <h2>Novo Dominio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={dominio.nome} onChange={handleInputChange} required />
        </label>
        <label>
          Código TLD:
          <input type="text" name="codigo_TLD" value={dominio.codigo_TLD} onChange={handleInputChange} required />
        </label>
        <label>
          Estado:
          <input type="checkbox" name="estado" checked={dominio.estado} onChange={handleInputChange} />
        </label>
        <label>
          Data de Início:
          <input type="datetime-local" name="data_de_inicio" value={dominio.data_de_inicio} onChange={handleInputChange} required />
        </label>
        <label>
          Data de Fim:
          <input type="datetime-local" name="data_de_fim" value={dominio.data_de_fim} onChange={handleInputChange} required />
        </label>
        <button type="submit">Guardar</button>
        <Link to="/dominios" className="cancel-btn">Cancelar</Link>
      </form>
    </div>
  );
};

export default DominioNew;
