import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import happyBirthdaySong from "./happy_birthday.mp3";

const Hole = ({ id, onMoleClick, moleVisible }) => (
  <div className="hole" onClick={() => moleVisible && onMoleClick(id)}>
    {moleVisible && <div className="mole"></div>}
  </div>
);

function App() {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [playing, setPlaying] = useState(false);
  const gameInterval = useRef(null);

  useEffect(() => {
    if (playing && score === 10) {
      const audio = new Audio(happyBirthdaySong);
      audio.play();
    }
  }, [score, playing]);

  const peep = () => {
    const randomTime = Math.round(Math.random() * (2000 - 1000) + 1000);
    const randomHole = Math.floor(Math.random() * moles.length);
    setMoles(moles.map((mole, index) => (index === randomHole ? true : false)));

    gameInterval.current = setTimeout(() => {
      setMoles(moles.map(() => false));
      if (!timeUp) peep();
    }, randomTime);
  };

  const startGame = () => {
    setScore(0);
    setTimeUp(false);
    setPlaying(true);
    peep();
    setTimeout(() => {
      setTimeUp(true);
      setPlaying(false);
      clearTimeout(gameInterval.current);
    }, 20000); // 30-second game duration
  };

  const onMoleClick = (id) => {
    if (moles[id]) {
      setScore(score + 1);
      setMoles(moles.map((mole, index) => (index === id ? false : mole)));
    }
  };

  return (
    <div className="App">
      <h1>Welcome, Amro!</h1>
      <div className="score-board">Score: {score}</div>
      <button className="start-button" onClick={startGame} disabled={playing}>
        Start Game
      </button>
      <div className="game-board">
        {moles.map((mole, index) => (
          <Hole
            key={index}
            id={index}
            onMoleClick={onMoleClick}
            moleVisible={mole}
          />
        ))}
      </div>
      {score >= 10 && <div className="flicker">Great Job, Amro!</div>}
    </div>
  );
}

export default App;
