import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const GameContainer = styled.div`
  text-align: center;
`;

const TitleNumber = styled.p`
  font-size: 2rem;
  margin: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin: 20px auto;
  justify-content: center;
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 24px;
  cursor: pointer;
  background-color: ${({ number, theme }) => 
    number === null ? 'transparent' : (number > 9 ? theme.colors.blue : theme.colors.pastelblue)};
  color: ${({ number }) => (number > 9 ? 'white' : 'black')};
  border-radius: 8px;
  transition: background-color 0.3s;

  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${blink} 0.5s ease forwards;
    `}
`;

const Level1 = ({ timer, handleStartGame, handleEndGame, resetTimer }) => {
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [numbersToGenerate, setNumbersToGenerate] = useState([]);

  useEffect(() => {
    resetGame(); // Reset the game when the component mounts
  }, []);

  const resetGame = () => {
    setStartTime(null);
    setNextNumber(1);
    const initialNumbers = Array.from({ length: 9 }, (_, i) => i + 1);
    shuffleArray(initialNumbers);
    
    setGrid(initialNumbers);
    setNumbersToGenerate(Array.from({ length: 9 }, (_, i) => i + 10)); // Numbers 10 to 18
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const handleClick = (number, index) => {
    if (number !== nextNumber) {
      return; // Only allow clicking the correct next number
    }
  
    // If the game starts with the first number clicked
    if (nextNumber === 1 && !startTime) {
      setStartTime(Date.now());
    }
  
    const newGrid = [...grid];
    newGrid[index] = null; // Set the clicked cell to null to remove the number
  
    // Generate and place a new number if the next number is less than 10
    if (nextNumber < 10 && numbersToGenerate.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbersToGenerate.length);
      const newNumber = numbersToGenerate[randomIndex];
      numbersToGenerate.splice(randomIndex, 1); // Remove the used number
  
      // Place the new number in the first null position
      const nullIndex = newGrid.indexOf(null);
      newGrid[nullIndex] = newNumber; // Place the new number
      setGrid(newGrid);
    }
  
    // Check if the game has ended
    if (nextNumber === 18) {
      alert('축하합니다! 게임이 끝났습니다!'); // Show alert when the last number is clicked
      handleEndGame(); // Trigger the end game handler
      return;
    }
  
    // Update the next number to click
    setNextNumber((prev) => prev + 1);
  };
  

  return (
    <GameContainer>
      <TitleNumber>다음 숫자: {nextNumber}</TitleNumber>
      <Grid>
        {grid.map((number, index) => (
          <Cell key={index} number={number} onClick={() => handleClick(number, index)}>
            {number}
          </Cell>
        ))}
      </Grid>
    </GameContainer>
  );
};

export default Level1;
