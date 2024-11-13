import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { GlobalStyle } from './style/GlobalStyle';
import './App.css';
import Header from './components/header/Header';
import Level from './components/game/Level1'; // Level 컴포넌트 하나로 통합
import Ranking from './components/ranking/Ranking';
import { GAME_LEVELS } from './constants/gameLevels'; // 상수 import

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
      setTimer(prevTimer => prevTimer);  // 기존 타이머 유지
    }
    return () => clearInterval(timerInterval);
  }, [startTime]);

  const startTimer = () => setStartTime(Date.now());
  const stopTimer = () => setStartTime(null); // stopTimer 호출 시 타이머는 그대로 유지
  const resetTimer = () => {
    setStartTime(null);
    setTimer('0.00');
  };

  const renderPage = () => {
    switch (selectedPage) {
      case 'game':
        const levelData = GAME_LEVELS[selectedLevel.toUpperCase()];
        return (
          <Level
            levelData={levelData}  // levelData로 게임 설정을 넘겨줌
            onStart={startTimer}
            onStop={stopTimer}
            onReset={resetTimer}
            elapsedTime={timer}
          />
        );
      case 'ranking':
        return <Ranking />;
      default:
        return <Level levelData={GAME_LEVELS.LEVEL_1} />;
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
