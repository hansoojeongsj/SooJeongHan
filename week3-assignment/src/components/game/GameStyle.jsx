import styled, { keyframes, css } from 'styled-components';

export const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const GameContainer = styled.div`
  text-align: center;
`;

export const TitleNumber = styled.p`
  font-size: 2rem;
  margin: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ gridSize }) => `repeat(${gridSize}, 100px)`};
  grid-gap: 1rem;
  margin: 2rem auto;
  justify-content: center;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 100%;
  font-size: 2.5rem;
  cursor: pointer;
  background-color: ${({ $number, theme, gridSize }) =>
    $number === null ? 'transparent' : $number > `${gridSize}` ? theme.colors.blue : theme.colors.pastelblue};
  color: ${({ $number, theme, gridSize }) => ($number > `${gridSize}` ? theme.colors.white : theme.colors.black)};
  border-radius: 8px;
  border: none;
  box-shadow: none;
  transition: background-color 0.3s;

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      animation: ${blink} 0.5s ease forwards;
    `}
`;
