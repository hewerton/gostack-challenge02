import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRespositories([...response.data]);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `New Repository ${Date.now()}`,
      url: "/reps/new_repository",
      techs: ["NodeJS", "ReactJS", "React Native"],
    });

    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRespositories(repositories.filter((rep) => rep.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep) => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
