import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((jokesData) => {
        setJokes(jokesData.data);
        console.log(jokesData.data);
      })
      .catch((error) => {
        console.log("their is somethig wrong", error);
      });
  }, []);
  return (
    <>
      <div>Jokes Data from API</div>
      <h1>Jokes {jokes.length}</h1>
      {jokes.map((data, index) => (
        <div key={index}>
          <p>{data.id}</p>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
