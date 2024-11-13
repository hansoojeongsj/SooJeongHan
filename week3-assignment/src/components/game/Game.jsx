import React, { useState, useEffect } from 'react';
import * as G from './GameStyle';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';

const Game = ({ levelData, onStart, onStop, onReset, elapsedTime }) => {
  const { START_NUM, END_NUM, GRID_SIZE } = levelData;
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(START_NUM);
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
    onReset();
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const updateClickedCells = (index) => {
    const updatedClickedCells = [...clickedCells];
    updatedClickedCells[index] = true;
    setClickedCells(updatedClickedCells);
  };

  const updateGridWithNewNumber = (number, index, usedNumbers) => {
    const newGrid = [...grid];
    const middleValue = Math.floor((END_NUM) / 2);

    if (number < middleValue + 1) {
      const availableNumbers = Array.from({ length: END_NUM - middleValue }, (_, i) => i + middleValue + 1);
      const remainingAvailableNumbers = availableNumbers.filter(num => !usedNumbers.includes(num));
      const randomNumber = remainingAvailableNumbers[Math.floor(Math.random() * remainingAvailableNumbers.length)];
      newGrid[index] = randomNumber;
    } else {
      newGrid[index] = null;
    }

    return newGrid;
  };

  const handleCellClick = (number, index) => {
    if (number !== nextNumber) {
      return;
    }

    updateClickedCells(index);

    if (nextNumber === START_NUM) {
      onStart();
    }

    const usedNumbers = [...grid.filter(num => num !== null)];
    const newGrid = updateGridWithNewNumber(number, index, usedNumbers);

    setGrid(newGrid);
    setNextNumber((prev) => prev + 1);

    if (nextNumber === END_NUM) {
      finishGame();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetGame();
  };

  return (
    <G.GameContainer>
      <G.TitleNumber>다음 숫자: {nextNumber}</G.TitleNumber>
      <G.Grid gridSize={GRID_SIZE}>
        {grid.map((number, index) => (
          <G.Cell key={index} gridSize={GRID_SIZE**2} $number={number} onClick={() => handleCellClick(number, index)} $isClicked={clickedCells[index]}>
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

Game.propTypes = {
  levelData: PropTypes.shape({
    LEVEL: PropTypes.number.isRequired, 
    START_NUM: PropTypes.number.isRequired,
    END_NUM: PropTypes.number.isRequired,
    GRID_SIZE: PropTypes.number.isRequired,
  }).isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  elapsedTime: PropTypes.string.isRequired,
};

export default Game;
