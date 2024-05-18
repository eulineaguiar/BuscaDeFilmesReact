import React, { useState } from 'react';
import './App.css';

function BuscaDeFilmes() {
  const [query, setQuery] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState('');

  const buscarFilmes = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-BR&api_key=eadceacdefcb72177eb7507b43595717`);
      const data = await response.json();
      if (response.ok) {
        setFilmes(data.results);
        setErro('');
      } else {
        setFilmes([]);
        setErro(data.status_message);
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setErro('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarFilmes();
  };

  return (
    <div className="container">
      <h2>Busca de Filmes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Buscar</button>
      </form>
      {erro && <p>{erro}</p>}
      <div className="filmes-container">
        {filmes.map((filme) => (
          <div key={filme.id} className="filme">
            <h3>{filme.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscaDeFilmes;
