import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [paises, setPaises] = useState([]);
  const [filtro, setFiltro] = useState("colombia");

  useEffect(() => {
    dataPaises();
  }, []);

  const dataPaises = async () => {
    try {
      const serverData = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
      setPaises(serverData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filtrar = paises.filter(pais => pais.name.common.toLowerCase().includes(filtro.toLowerCase()));
  const onchangeFilter = (event) => {
    setFiltro(event.target.value);
  };

  const onMostrar = (pais) => {
    setFiltro(pais);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 sm:p-6">
      {/* Encabezado */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center">Países</h1>

      {/* Input de búsqueda */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={filtro}
          onChange={onchangeFilter}
          placeholder="Busca un país..."
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Contenido condicional */}
      <div className="max-w-2xl mx-auto">
        {filtrar.length > 10 ? (
          <p className="text-center text-gray-500">Demasiados países, por favor sea más específico</p>
        ) : filtrar.length > 1 ? (
          <ul className="space-y-3">
            {filtrar.map((pais, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition-colors"
              >
                <span>{pais.name.common}</span>
                <button
                  onClick={() => onMostrar(pais.name.common)}
                  className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-md hover:bg-yellow-400 transition-colors"
                >
                  Mostrar
                </button>
              </li>
            ))}
          </ul>
        ) : filtrar.length === 1 ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{filtrar[0].name.common}</h2>
            <p className="text-gray-600 mb-2">Capital: {filtrar[0].capital}</p>
            <p className="text-gray-600 mb-4">Población: {filtrar[0].population.toLocaleString()}</p>
            <img
              src={filtrar[0].flags.png}
              alt={filtrar[0].name.common}
              className="mx-auto w-48 h-auto rounded-md shadow-md"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron países</p>
        )}
      </div>
    </div>
  );
};

export default App;