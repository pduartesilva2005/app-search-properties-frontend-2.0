import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { PropertyItem, Property } from '../components/PropertyItem';

import styles from '../styles/pages/Home.module.scss';
import { api } from '../services/api';

type IBGEUFResponse = {
  sigla: string;
}

type IBGECityResponse = {
  nome: string;
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [type_property, setTypeProperty] = useState('');
  const [state, setState] = useState('0');
  const [city, setCity] = useState('0');
  const [neighborhood, setNeighborhood] = useState('');
  const [price, setPrice] = useState('');
  const [dependencies, setDependencies] = useState('');

  function toggleTab(index: number) {
    setSelectedTab(index);
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setStates(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (state === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [state]);

  function handleSelectState(e: ChangeEvent<HTMLSelectElement>) {
    const state = e.target.value;

    setState(state);
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;

    setCity(city);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('properties', {
      params: {
        type_property,
        state,
        city,
        neighborhood,
        price,
        dependencies
      }
    });

    setProperties(response.data);
  }

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Search Properties</title>
      </Head>


      <main>
        <div className={styles.tabContainer}>
          <div className={styles.tabHead}>
            <button
              className={selectedTab === 1 ? styles.active : ''}
              onClick={() => toggleTab(1)}
            >
              Vender
        </button>

            <button
              className={selectedTab === 2 ? styles.active : ''}
              onClick={() => toggleTab(2)}
            >
              Comprar
        </button>

            <button
              className={selectedTab === 3 ? styles.active : ''}
              onClick={() => toggleTab(3)}
            >
              Investir
        </button>

            <button
              className={selectedTab === 4 ? styles.active : ''}
              onClick={() => toggleTab(4)}
            >
              Alugar
        </button>
          </div>

          <div className={styles.tabContent}>
            <div className={selectedTab === 1 ? styles.activeContent : styles.content}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.selectBlock}>
                    <label htmlFor="type_property">Tipo do Imóvel</label>
                    <select
                      name="type_property"
                      value={type_property}
                      onChange={e => setTypeProperty(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Selecione uma Opção
                  </option>

                      <option value="Casa Térrea">Casa Térrea</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Mansão">Mansão</option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Assobrado">Assobrado</option>
                      <option value="Fazenda">Fazenda</option>
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="state">Estado</label>
                    <select
                      name="state"
                      value={state}
                      onChange={handleSelectState}
                    >
                      <option value="0">
                        Selecione um Estado
                  </option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="city">Cidade</label>
                    <select
                      name="city"
                      value={city}
                      onChange={handleSelectCity}
                    >
                      <option value="0">
                        Selecione uma Opção
                  </option>
                      {cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="price">Preço</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="R$"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="dependencies">Dependências</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={dependencies}
                      onChange={e => setDependencies(e.target.value)}
                    />
                  </div>
                </div>

                <button className={styles.buttonForm} type="submit">
                  Buscar
                </button>
              </form>
            </div>

            <div className={selectedTab === 2 ? styles.activeContent : styles.content}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.selectBlock}>
                    <label htmlFor="type_property">Tipo do Imóvel</label>
                    <select
                      name="type_property"
                      value={type_property}
                      onChange={e => setTypeProperty(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Selecione uma Opção
                  </option>

                      <option value="Casa Térrea">Casa Térrea</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Mansão">Mansão</option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Assobrado">Assobrado</option>
                      <option value="Fazenda">Fazenda</option>
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="state">Estado</label>
                    <select
                      name="state"
                      value={state}
                      onChange={handleSelectState}
                    >
                      <option value="0">
                        Selecione um Estado
                  </option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="city">Cidade</label>
                    <select
                      name="city"
                      value={city}
                      onChange={handleSelectCity}
                    >
                      <option value="0">
                        Selecione uma Opção
                  </option>
                      {cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="price">Preço</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="R$"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="dependencies">Dependências</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={dependencies}
                      onChange={e => setDependencies(e.target.value)}
                    />
                  </div>
                </div>

                <button className={styles.buttonForm} type="submit">
                  Buscar
                </button>
              </form>
            </div>
            <div className={selectedTab === 3 ? styles.activeContent : styles.content}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.selectBlock}>
                    <label htmlFor="type_property">Tipo do Imóvel</label>
                    <select
                      name="type_property"
                      value={type_property}
                      onChange={e => setTypeProperty(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Selecione uma Opção
                  </option>

                      <option value="Casa Térrea">Casa Térrea</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Mansão">Mansão</option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Assobrado">Assobrado</option>
                      <option value="Fazenda">Fazenda</option>
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="state">Estado</label>
                    <select
                      name="state"
                      value={state}
                      onChange={handleSelectState}
                    >
                      <option value="0">
                        Selecione um Estado
                  </option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="city">Cidade</label>
                    <select
                      name="city"
                      value={city}
                      onChange={handleSelectCity}
                    >
                      <option value="0">
                        Selecione uma Opção
                  </option>
                      {cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="price">Preço</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="R$"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="dependencies">Dependências</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={dependencies}
                      onChange={e => setDependencies(e.target.value)}
                    />
                  </div>
                </div>

                <button className={styles.buttonForm} type="submit">
                  Buscar
                </button>
              </form>
            </div>

            <div className={selectedTab === 4 ? styles.activeContent : styles.content}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <div className={styles.selectBlock}>
                    <label htmlFor="type_property">Tipo do Imóvel</label>
                    <select
                      name="type_property"
                      value={type_property}
                      onChange={e => setTypeProperty(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Selecione uma Opção
                  </option>

                      <option value="Casa Térrea">Casa Térrea</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Mansão">Mansão</option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Assobrado">Assobrado</option>
                      <option value="Fazenda">Fazenda</option>
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="state">Estado</label>
                    <select
                      name="state"
                      value={state}
                      onChange={handleSelectState}
                    >
                      <option value="0">
                        Selecione um Estado
                  </option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.selectBlock}>
                    <label htmlFor="city">Cidade</label>
                    <select
                      name="city"
                      value={city}
                      onChange={handleSelectCity}
                    >
                      <option value="0">
                        Selecione uma Opção
                  </option>
                      {cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={e => setNeighborhood(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="price">Preço</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="R$"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputBlock}>
                    <label htmlFor="dependencies">Dependências</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={dependencies}
                      onChange={e => setDependencies(e.target.value)}
                    />
                  </div>
                </div>

                <button className={styles.buttonForm} type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={!properties ? styles.noProperties : styles.properties}>
          {properties.map(property => {
            return (
              <PropertyItem 
                key={property.id}
                property={property}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
