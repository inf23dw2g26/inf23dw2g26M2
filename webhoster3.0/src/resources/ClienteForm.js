import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "./components/authContext";


const ClienteList = () => {
  const { authenticated } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);

  const [searchNome, setSearchNome] = useState("");
  const [searchTipoConta, setSearchTipoConta] = useState("");
  const [searchContacto, setSearchContacto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResult = await api.get("/cliente");
        const clientesData = clientesResult.data;

        setClientes(clientesData);
        setFilteredClientes(clientesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterClientes = () => {
      let filtered = [...clientes];

      if (searchNome) {
        filtered = filtered.filter((cliente) =>
          cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
        );
      }

      if (searchTipoConta) {
        filtered = filtered.filter((cliente) =>
          cliente.tipo_de_conta.toLowerCase().includes(searchTipoConta.toLowerCase())
        );
      }

      if (searchContacto) {
        filtered = filtered.filter((cliente) =>
          cliente.contacto.toLowerCase().includes(searchContacto.toLowerCase())
        );
      }

      setFilteredClientes(filtered);
    };

    filterClientes();
  }, [searchNome, searchTipoConta, searchContacto, clientes]);

  const deleteCliente = async (id) => {
    try {
      await api.delete(`/cliente/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      setFilteredClientes(filteredClientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error("Error deleting cliente:", error);
    }
  };

  return (
    <div className="consulta-list">
      <h1>Clientes</h1>
      <div className="filters">
        <label>
          Nome do Cliente:
          <input
            type="text"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
          />
        </label>
        <label>
          Tipo de Conta:
          <input
            type="text"
            value={searchTipoConta}
            onChange={(e) => setSearchTipoConta(e.target.value)}
          />
        </label>
        <label>
          Contacto do Cliente:
          <input
            type="text"
            value={searchContacto}
            onChange={(e) => setSearchContacto(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/cliente/new" className="new-consulta">
            Novo Cliente
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Tipo de Conta</th>
            <th>Contacto do Cliente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.tipo_de_conta}</td>
              <td>{cliente.contacto}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/cliente/edit/${cliente.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deleteCliente(cliente.id)} className="delete-btn">
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

export default ClienteList;
