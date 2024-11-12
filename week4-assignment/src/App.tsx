import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>안녕하세요</div>
      </ThemeProvider>
  );
}

export default App;
