import React, { useState, useEffect } from 'react';
import * as G from './Level1Style';

const Level1 = ({ setTimer }) => {
  const [grid, setGrid] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [numbersToGenerate, setNumbersToGenerate] = useState([]);
  const [clickedCells, setClickedCells] = useState(new Array(9).fill(false));

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (startTime) {
      timerInterval = setInterval(() => {
        setTimer(((Date.now() - startTime) / 1000).toFixed(2)); // 타이머 업데이트
      }, 10);
    }
    return () => clearInterval(timerInterval); // 컴포넌트 언마운트 시 타이머 정리
  }, [startTime, setTimer]);

  const resetGame = () => {
    setStartTime(null);
    setNextNumber(1);
    setClickedCells(new Array(9).fill(false));
    const initialNumbers = Array.from({ length: 9 }, (_, i) => i + 1);
    shuffleArray(initialNumbers);
    
    setGrid(initialNumbers); // 초기 숫자 세팅
    setNumbersToGenerate(Array.from({ length: 9 }, (_, i) => i + 10)); // 10부터 18까지의 숫자 배열
    setTimer(0); // 타이머 초기화
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClick = (number, index) => {
    if (number !== nextNumber) {
      return; // 올바른 숫자가 아니면 리턴
    }

    const updatedClickedCells = [...clickedCells];
    updatedClickedCells[index] = true; // 클릭된 셀 기록
    setClickedCells(updatedClickedCells);

    if (nextNumber === 1 && !startTime) {
      setStartTime(Date.now());
    }

    const newGrid = [...grid];
    newGrid[index] = null; // 클릭한 숫자를 null로 설정
    setGrid(newGrid);

    // 새로운 숫자 추가
    if (nextNumber < 26 && numbersToGenerate.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbersToGenerate.length);
      const newNumber = numbersToGenerate[randomIndex];
      numbersToGenerate.splice(randomIndex, 1); // 사용한 숫자 제거
      newGrid[newGrid.indexOf(null)] = newNumber; // null 위치에 새로운 숫자 추가
      setGrid(newGrid);
    }

    // 게임 종료 조건
    if (nextNumber === 18) {
      alert(`게임 끝! 걸린 시간:${((Date.now() - startTime) / 1000).toFixed(2)}초`);
      resetGame();
      return;
    }
    
    setNextNumber((prev) => prev + 1); // 다음 숫자로 증가
  };

  return (
    <G.GameContainer>
      <G.TitleNumber>다음 숫자: {nextNumber}</G.TitleNumber>
      <G.Grid>
        {grid.map((number, index) => (
          <G.Cell key={index} number={number} onClick={() => handleClick(number, index)} isClicked={clickedCells[index]}>
            {number}
          </G.Cell>
        ))}
      </G.Grid>
    </G.GameContainer>
  );
};

export default Level1;