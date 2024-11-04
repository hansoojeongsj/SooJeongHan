import React, { useState, useEffect } from 'react';
import * as G from './Level3Style';
import Modal from '../modal/Modal';

const Game = ({ setTimer }) => {
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [numbersToGenerate, setNumbersToGenerate] = useState([]);
  const [clickedCells, setClickedCells] = useState(new Array(25).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('0.00');
  
  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (startTime) {
      timerInterval = setInterval(() => {
        const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        setTimer(`${timeElapsed}`);
        setElapsedTime(timeElapsed);
      }, 10);
    }
    return () => clearInterval(timerInterval);
  }, [startTime, setTimer]);

  const finishGame = () => {
    setStartTime(null);
    
    // 게임이 끝날 때 기록 저장
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
    setTimer('0.00');
    setElapsedTime('0.00');
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
  
    if (nextNumber === 1 && !startTime) {
      setStartTime(Date.now());
    }
  
    const newGrid = [...grid];
    newGrid[index] = null;
    setGrid(newGrid);
  
    if (nextNumber < 26 && numbersToGenerate.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbersToGenerate.length);
      const newNumber = numbersToGenerate[randomIndex];
      numbersToGenerate.splice(randomIndex, 1);
      newGrid[newGrid.indexOf(null)] = newNumber;
      setGrid(newGrid);
    }
  
    if (nextNumber === 50) {
      setIsModalOpen(true);
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

export default Game;
