import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type IBGEUFResponse = {
  id: number,
  sigla: string,
  nome: string
}

type IBGECityResponse = {
  id: number,
  nome: string
}


function App() {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedUf, setSelectedUF] = useState("0");
  const [selectedCity, setSelecteCity] = useState("0");

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        setCities(response.data);
      });
  }, [selectedUf]);

  const handleSelectUF = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setSelectedUF(uf);
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelecteCity(city)
  };

  return (
    <>

      <h1> Seletor de ufs e cidades  </h1>
      <br /><br />

      <div className="container">
        <select name="uf" id="uf" onChange={handleSelectUF}>
          <option value="0" > Selecione o UF </option>
          {ufs.map(uf => (
            <option key={uf.id} value={uf.id}>
              {uf.nome}
            </option>
          ))}
        </select>

        <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
          <option value="0" > Selecione a Cidade </option>
          {cities.map((city) => (
            <option key={city.id} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default App
