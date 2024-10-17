import React, { useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [flags, setFlags] = useState([]);
  const [jokeType, setJokeType] = useState("");
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

  const fetchJoke = async () => {
    const categoriesParam =
      categories.length > 0 ? categories.join(",") : "Any";
    const flagsParam =
      flags.length > 0 ? `?blacklistFlags=${flags.join(",")}` : "";
    const typeParam = jokeType ? `?type=${jokeType}` : "";
    const amountParam = jokeAmount > 1 ? `&amount=${jokeAmount}` : "";

    const url = `https://v2.jokeapi.dev/joke/${categoriesParam}${flagsParam}${typeParam}${amountParam}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        setJokes([{ error: data.message }]);
      } else {
        setJokes(data.jokes || [data]); // Single joke or multiple jokes
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
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          )
        )}

        <h3>Select Flags: (optional)</h3>
        {["nsfw", "religious", "political", "racist", "sexist", "explicit"].map(
          (flag) => (
            <label key={flag}>
              <input type="checkbox" value={flag} onChange={handleFlagChange} />
              {flag}
            </label>
          )
        )}

        <h3>Select Joke Type:</h3>
        {["single", "twopart", ""].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="type"
              value={type}
              checked={jokeType === type}
              onChange={(e) => setJokeType(e.target.value)}
            />
            {type === ""
              ? "Any Type"
              : type === "single"
              ? "Single Joke"
              : "Two-part Joke"}
          </label>
        ))}

        <div>
          <label htmlFor="jokeAmount">Number of jokes:</label>
          <input
            type="number"
            id="jokeAmount"
            min="1"
            max="10"
            value={jokeAmount}
            onChange={(e) => setJokeAmount(e.target.value)}
          />
        </div>

        <button onClick={fetchJoke}>Get Joke</button>

        {/* Display request URL for debugging
        <p><strong>Request URL:</strong> {requestUrl}</p> */}
      </div>

      <div className="joke-box">
      <h2>Here you go:</h2>
        {jokes.length > 0 ? (
          jokes.map((joke, index) => (
            <div key={index}>
              {joke.error ? (
                <p>Error: {joke.error}</p>
              ) : joke.setup && joke.delivery ? (
                <>
                  <p>{joke.setup}</p>
                  <p>{joke.delivery}</p>
                </>
              ) : (
                <p>{joke.joke}</p>
              )}
              {index < jokes.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default App;
