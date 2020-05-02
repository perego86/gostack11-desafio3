import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
  
    const response = await api.post('/repositories', {
    url: "https://github.com/josepholiveira",
    title: "Desafio ReactJS",
    techs: ["React", "Node.js"]});

    const test = response.data;

    setRepositories([...repositories, test]);

    
  }

  async function handleRemoveRepository(id) {
    let index = repositories.findIndex(s => s.id === id);

    if (index < 0)   return;

    const response  = await api.delete('/repositories/' + id);

    if (response.status !== 204) return;
    
    repositories.splice(index,1);

    setRepositories([...repositories]);
  }

  return (
    <>
      <ul data-testid="repository-list">
       
          {repositories.map(repository => 
              <li key={repository.id}>{repository.title}
                <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
              
              )}

        
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
