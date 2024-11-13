import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { GlobalStyle } from './style/GlobalStyle';
import './App.css';
import Header from './components/header/Header';
import Game from './components/game/Game';
import Ranking from './components/ranking/Ranking';
import { GAME_LEVELS } from './constants/gameLevels';

function App() {
  const [selectedPage, setSelectedPage] = useState('game');
  const [selectedLevel, setSelectedLevel] = useState('level1');
  const [timer, setTimer] = useState('0.00');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timerInterval;
    if (startTime) {
      timerInterval = setInterval(() => {
        setTimer(((Date.now() - startTime) / 1000).toFixed(2));
      }, 10);
    } else {
      setTimer(prevTimer => prevTimer);
    }
    return () => clearInterval(timerInterval);
  }, [startTime]);

  const startTimer = () => setStartTime(Date.now());
  const stopTimer = () => setStartTime(null);
  const resetTimer = () => {
    setStartTime(null);
    setTimer('0.00');
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'game':
        const levelData = GAME_LEVELS[selectedLevel.toUpperCase()];
        return (
          <Game
            levelData={levelData}
            onStart={startTimer}
            onStop={stopTimer}
            onReset={resetTimer}
            elapsedTime={timer}
          />
        );
      case 'ranking':
        return <Ranking />;
      default:
        return <Game levelData={GAME_LEVELS.LEVEL_1} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header
        onSelect={setSelectedPage}
        selectedPage={selectedPage}
        timeElapsed={timer}
        setSelectedLevel={setSelectedLevel}
      />
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;
