import React, { useState, useEffect } from 'react';
import * as G from './Level3Style';
import Modal from '../modal/Modal';

const Level3 = ({ onStart, onStop, onReset, elapsedTime }) => {
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [numbersToGenerate, setNumbersToGenerate] = useState([]);
  const [clickedCells, setClickedCells] = useState(new Array(25).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const finishGame = () => {
    onStop();

    setIsModalOpen(true);
    const newRecord = {
      timestamp: new Date().toISOString(),
      level: 'Level 3',
      playTime: elapsedTime,
    };
    const currentRecords = JSON.parse(localStorage.getItem('rankings')) || [];
    currentRecords.push(newRecord);
    localStorage.setItem('rankings', JSON.stringify(currentRecords));
  };

  const resetGame = () => {
    setNextNumber(1);
    setClickedCells(new Array(25).fill(false));
    const initialNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
    shuffleArray(initialNumbers);

    setGrid(initialNumbers);
    setNumbersToGenerate(Array.from({ length: 25 }, (_, i) => i + 26));
    onReset();
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClick = (number, index) => {
    if (number !== nextNumber) {
      return;
    }
  
    const updatedClickedCells = [...clickedCells];
    updatedClickedCells[index] = true;
    setClickedCells(updatedClickedCells);
  
    if (nextNumber === 1) {
      onStart();
    }
  
    const newGrid = [...grid];
    newGrid[index] = null;
  
    if (nextNumber >= 1 && nextNumber < 26 && numbersToGenerate.length > 0) {
      const randomNumber = numbersToGenerate[Math.floor(Math.random() * numbersToGenerate.length)];
      newGrid[index] = randomNumber;
      setNumbersToGenerate((prev) => prev.filter((num) => num !== randomNumber));
    }
  
    setGrid(newGrid);
  
    if (nextNumber === 50) {
      finishGame();
      return;
    }
  
    setNextNumber((prev) => prev + 1);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    resetGame();
  };

  return (
    <G.GameContainer>
      <G.TitleNumber>다음 숫자: {nextNumber}</G.TitleNumber>
      <G.Grid>
        {grid.map((number, index) => (
          <G.Cell key={index} $number={number} onClick={() => handleClick(number, index)} $isClicked={clickedCells[index]}>
            {number}
          </G.Cell>
        ))}
      </G.Grid>
      {isModalOpen && (
        <Modal 
          onClose={closeModal} 
          message={`게임 끝! 기록: ${elapsedTime}초`}
        />
      )}
    </G.GameContainer>
  );
};

export default Level3;
