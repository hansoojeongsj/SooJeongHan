import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { GlobalStyle } from './style/GlobalStyle';
import './App.css';
import Header from './components/header/Header';
import Level1 from './components/game/Level1';
import Level2 from './components/game/Level2';
import Level3 from './components/game/Level3';
import Ranking from './components/ranking/Ranking';

function App() {
  const [selectedPage, setSelectedPage] = useState('game'); // Track game or ranking
  const [selectedLevel, setSelectedLevel] = useState('level1'); // Track selected level
  const [timer, setTimer] = useState(0); 

  const renderPage = () => {
    switch (selectedPage) {
      case 'game':
        switch (selectedLevel) {
          case 'level1':
            return <Level1 setTimer={setTimer} />;
          case 'level2':
            return <Level2 setTimer={setTimer} />;
          case 'level3':
            return <Level3 setTimer={setTimer} />;
          default:
            return <Level1 setTimer={setTimer} />;
        }
      case 'ranking':
        return <Ranking />;
      default:
        return <Level1 setTimer={setTimer} />;
    }
  };

  return (
    <>
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
    </>
  );
}

export default App;
