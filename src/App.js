import React, { useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [flags, setFlags] = useState([]);
  const [jokeTypes, setJokeTypes] = useState([]);
  const [jokeAmount, setJokeAmount] = useState(1);
  const [jokes, setJokes] = useState([]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const handleFlagChange = (event) => {
    const { value, checked } = event.target;
    setFlags((prev) =>
      checked ? [...prev, value] : prev.filter((flag) => flag !== value)
    );
  };

  const handleJokeTypeChange = (event) => {
    const { value, checked } = event.target;
    setJokeTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const fetchJoke = async () => {
    const categoriesParam =
      categories.length > 0 ? categories.join(",") : "Any";
    const flagsParam =
      flags.length > 0 ? `&blacklistFlags=${flags.join(",")}` : "";
    const typeParam =
      jokeTypes.length > 0 ? `&type=${jokeTypes.join(",")}` : "";
    const amountParam = jokeAmount > 1 ? `&amount=${jokeAmount}` : "";

    const url = `https://v2.jokeapi.dev/joke/${categoriesParam}?${typeParam}${flagsParam}${amountParam}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setJokes([{ error: data.message }]);
      } else if (Array.isArray(data.jokes)) {
        setJokes(data.jokes);
      } else {
        setJokes([data]);
      }
    } catch (error) {
      setJokes([{ error: "Failed to fetch jokes" }]);
    }
  };

  return (
    <div className="App">
      <div className="statebar">
        <h1>Wanna hear a joke?</h1>
      </div>

      <div className="category-section">
      <h3>Select Categories:</h3>
{["Miscellaneous", "Dark", "Pun", "Spooky", "Christmas"].map(
  (category) => (
    <div className="checkbox-wrapper-9" key={category}>
      <input
        className="tgl tgl-flat"
        type="checkbox"
        id={`category-${category}`}
        value={category}
        onChange={handleCategoryChange}
      />
      <label className="tgl-btn" htmlFor={`category-${category}`}>
        <span>{category}</span>
      </label>
    </div>
  )
)}

<h3>Select Flags: (optional)</h3>
{["nsfw", "religious", "political", "racist", "sexist", "explicit"].map(
  (flag) => (
    <div className="checkbox-wrapper-9" key={flag}>
      <input
        className="tgl tgl-flat"
        type="checkbox"
        id={`flag-${flag}`}
        value={flag}
        onChange={handleFlagChange}
      />
      <label className="tgl-btn" htmlFor={`flag-${flag}`}>
        <span>{flag}</span>
      </label>
    </div>
  )
)}

<h3>Select Joke Type:</h3>
{["single", "twopart"].map((type) => (
  <div className="checkbox-wrapper-9" key={type}>
    <input
      className="tgl tgl-flat"
      type="checkbox"
      id={`type-${type}`}
      name="type"
      value={type}
      onChange={handleJokeTypeChange}
    />
    <label className="tgl-btn" htmlFor={`type-${type}`}>
      <span>{type}</span>
    </label>
  </div>
))}


        <br />
        <div>
          <label htmlFor="jokeAmount">Number of jokes:</label>
          <input
            type="number"
            id="jokeAmount"
            min="1"
            max="10"
            value={jokeAmount}
            onChange={(e) => setJokeAmount(parseInt(e.target.value))}
          />
        </div>

        <button onClick={fetchJoke}>Get Joke</button>
      </div>

      <div className="joke-box">
        <h2>Here you go:</h2>
        {jokes.length > 0 ? (
          jokes.map((joke, index) => (
            <div key={index}>
              {joke.error ? (
                <p>Error: {joke.error}</p>
              ) : joke.type === "twopart" ? (
                <>
                  <p>
                    {joke.setup}
                  </p>
                  <p>
                    {joke.delivery}
                  </p>
                </>
              ) : (
                <p>{joke.joke}</p>
              )}
              {index < jokes.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>No jokes to display. Click "Get Joke" to fetch jokes!</p>
        )}
      </div>
    </div>
  );
}

export default App;

