import { useState, useEffect } from "react";
import Card from "../Card/Card";

const Game = () => {
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const shuffle = (array) => {
    let cards = [...array];
    for (let i = cards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = temp;
    }
    return cards.slice(0, numberOfCards);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
        );
        const data = await response.json();
        const pokemonData = data.results.map((result, index) => ({
          id: index,
          text: result.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            index + 1
          }.png`,
        }));
        setShuffledCards(shuffle(pokemonData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [numberOfCards]);

  const handleCardClick = (id) => {
    if (clickedCards.has(id)) {
      setScore(0);
      setClickedCards(new Set());
    } else {
      const newScore = score + 1;
      if (newScore > bestScore) {
        setBestScore(newScore);
        if (newScore === numberOfCards) {
          setGameOver(true);
        }
      }
      setScore(newScore);
      setClickedCards((prevCards) => new Set(prevCards).add(id));
    }
    setShuffledCards(shuffle([...shuffledCards]));
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading Pokémon...</div>
      </div>
    );
  }

  return (
    <>
      {numberOfCards === 0 && (
        <div className="app-container">
          <button onClick={() => setNumberOfCards(5)} className="button">
            Easy
          </button>
          <button onClick={() => setNumberOfCards(15)} className="button">
            Medium
          </button>
          <button onClick={() => setNumberOfCards(25)} className="button">
            Hard
          </button>
        </div>
      )}

      {gameOver && (
        <div className="game-over-container">
          <h1>You Win!</h1>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
      {!gameOver && (
        <div className="app-container">
          <div className="scores-container">
            <p className="score">Score: {score}</p>
            <p className="score">Best Score: {bestScore}</p>
          </div>
          <div className="cards-grid">
            {shuffledCards.map((d) => (
              <Card
                key={d.id}
                text={d.text}
                img={d.img}
                onClick={() => handleCardClick(d.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
