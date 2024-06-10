import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../server";
import AuthContext from "../components/authContext";

const DominioList = () => {
  const { authenticated } = useContext(AuthContext);
  const [dominios, setDominios] = useState([]);
  const [filteredDominios, setFilteredDominios] = useState([]);

  const [searchNome, setSearchNome] = useState("");
  const [searchCodigoTLD, setSearchCodigoTLD] = useState("");
  const [searchEstado, setSearchEstado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dominiosResult = await api.get("/dominio");
        const dominiosData = dominiosResult.data;

        setDominios(dominiosData);
        setFilteredDominios(dominiosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterDominios = () => {
      let filtered = [...dominios];

      if (searchNome) {
        filtered = filtered.filter((dominio) =>
          dominio.nome.toLowerCase().includes(searchNome.toLowerCase())
        );
      }

      if (searchCodigoTLD) {
        filtered = filtered.filter((dominio) =>
          dominio.codigo_TLD.toLowerCase().includes(searchCodigoTLD.toLowerCase())
        );
      }

      if (searchEstado) {
        filtered = filtered.filter((dominio) =>
          dominio.estado.toString().toLowerCase().includes(searchEstado.toLowerCase())
        );
      }

      setFilteredDominios(filtered);
    };

    filterDominios();
  }, [searchNome, searchCodigoTLD, searchEstado, dominios]);

  const deleteDominio = async (id) => {
    try {
      await api.delete(`/dominio/${id}`);
      setDominios(dominios.filter((dominio) => dominio.id !== id));
      setFilteredDominios(filteredDominios.filter((dominio) => dominio.id !== id));
    } catch (error) {
      console.error("Error deleting dominio:", error);
    }
  };

  return (
    <div className="dominio-list">
      <h1>Dominios</h1>
      <div className="filters">
        <label>
          Nome do Dominio:
          <input
            type="text"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
          />
        </label>
        <label>
          Código TLD:
          <input
            type="text"
            value={searchCodigoTLD}
            onChange={(e) => setSearchCodigoTLD(e.target.value)}
          />
        </label>
        <label>
          Estado:
          <input
            type="text"
            value={searchEstado}
            onChange={(e) => setSearchEstado(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/dominio/new" className="new-dominio">
            Novo Dominio
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome do Dominio</th>
            <th>Código TLD</th>
            <th>Estado</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDominios.map((dominio) => (
            <tr key={dominio.id}>
              <td>{dominio.nome}</td>
              <td>{dominio.codigo_TLD}</td>
              <td>{dominio.estado ? "Ativo" : "Inativo"}</td>
              <td>
                {new Date(dominio.data_de_inicio).toLocaleString("pt-PT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {new Date(dominio.data_de_fim).toLocaleString("pt-PT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/dominio/edit/${dominio.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deleteDominio(dominio.id)} className="delete-btn">
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

export default DominioList;
