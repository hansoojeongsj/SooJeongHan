import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { GlobalStyle } from './style/GlobalStyle';
import './App.css';
import Header from './components/header/Header';
import Level1 from './components/game/Level1';
import Ranking from './components/ranking/Ranking';

function App() {
  const [selectedPage, setSelectedPage] = useState('game'); 

  const renderPage = () => {
    switch (selectedPage) {
      case 'game':
        return <Level1 />;
      case 'ranking':
        return <Ranking />;
      default:
        return <Level1 />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header onSelect={setSelectedPage} selectedPage={selectedPage} />
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;
