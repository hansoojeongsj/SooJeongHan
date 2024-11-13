import React, { useState, useEffect } from 'react';
import * as G from './Level1Style'; // 스타일링
import Modal from '../modal/Modal';

const Level = ({ levelData, onStart, onStop, onReset, elapsedTime }) => {
  const { START_NUM, END_NUM, GRID_SIZE } = levelData;
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(START_NUM);
  const [numbersToGenerate, setNumbersToGenerate] = useState([]);
  const [clickedCells, setClickedCells] = useState(new Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    resetGame();
  }, [levelData]);

  const finishGame = () => {
    onStop();
    setIsModalOpen(true);
    const newRecord = {
      timestamp: new Date().toISOString(),
      level: `Level ${levelData.LEVEL}`,
      playTime: elapsedTime,
    };
    const currentRecords = JSON.parse(localStorage.getItem('rankings')) || [];
    currentRecords.push(newRecord);
    localStorage.setItem('rankings', JSON.stringify(currentRecords));
  };

  const resetGame = () => {
    setNextNumber(START_NUM);
    setClickedCells(new Array(GRID_SIZE * GRID_SIZE).fill(false));
    const initialNumbers = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i + START_NUM);
    shuffleArray(initialNumbers);
    setGrid(initialNumbers);
    setNumbersToGenerate(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i + END_NUM + 1));
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

    if (nextNumber === START_NUM) {
      onStart();
    }

    const newGrid = [...grid];
    newGrid[index] = null;

    if (nextNumber === END_NUM) {
      finishGame();
      return;
    }

    setGrid(newGrid);
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

export default Level;
