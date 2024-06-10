import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../server";
import AuthContext from "../components/authContext";

const PlanoList = () => {
  const { authenticated } = useContext(AuthContext);
  const [planos, setPlanos] = useState([]);
  const [filteredPlanos, setFilteredPlanos] = useState([]);

  const [searchTipoDePlano, setSearchTipoDePlano] = useState("");
  const [searchPeriodicidade, setSearchPeriodicidade] = useState("");
  const [searchPreco, setSearchPreco] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planosResult = await api.get("/plano");
        const planosData = planosResult.data;

        setPlanos(planosData);
        setFilteredPlanos(planosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterPlanos = () => {
      let filtered = [...planos];

      if (searchTipoDePlano) {
        filtered = filtered.filter((plano) =>
          plano.tipo_de_plano.toLowerCase().includes(searchTipoDePlano.toLowerCase())
        );
      }

      if (searchPeriodicidade) {
        filtered = filtered.filter((plano) =>
          plano.periodicidade.toLowerCase().includes(searchPeriodicidade.toLowerCase())
        );
      }

      if (searchPreco) {
        filtered = filtered.filter((plano) =>
          plano.preco.toString().toLowerCase().includes(searchPreco.toLowerCase())
        );
      }

      setFilteredPlanos(filtered);
    };

    filterPlanos();
  }, [searchTipoDePlano, searchPeriodicidade, searchPreco, planos]);

  const deletePlano = async (id) => {
    try {
      await api.delete(`/plano/${id}`);
      setPlanos(planos.filter((plano) => plano.id !== id));
      setFilteredPlanos(filteredPlanos.filter((plano) => plano.id !== id));
    } catch (error) {
      console.error("Error deleting plano:", error);
    }
  };

  return (
    <div className="plano-list">
      <h1>Planos</h1>
      <div className="filters">
        <label>
          Tipo de Plano:
          <input
            type="text"
            value={searchTipoDePlano}
            onChange={(e) => setSearchTipoDePlano(e.target.value)}
          />
        </label>
        <label>
          Periodicidade:
          <input
            type="text"
            value={searchPeriodicidade}
            onChange={(e) => setSearchPeriodicidade(e.target.value)}
          />
        </label>
        <label>
          Preço:
          <input
            type="text"
            value={searchPreco}
            onChange={(e) => setSearchPreco(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/plano/new" className="new-plano">
            Novo Plano
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Tipo de Plano</th>
            <th>Periodicidade</th>
            <th>Preço</th>
            <th>Armazenamento</th>
            <th>Número de Contas de Email</th>
            <th>Número de Domínios</th>
            <th>Largura de Banda</th>
            <th>Fidelização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanos.map((plano) => (
            <tr key={plano.id}>
              <td>{plano.tipo_de_plano}</td>
              <td>{plano.periodicidade}</td>
              <td>{Number(plano.preco).toFixed(2)}</td>
              <td>{plano.armazamento}</td>
              <td>{plano.numero_de_contas_email}</td>
              <td>{plano.numero_de_dominios}</td>
              <td>{plano.largura_de_banda}</td>
              <td>{plano.fidelizacao}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/plano/edit/${plano.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deletePlano(plano.id)} className="delete-btn">
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

export default PlanoList;
