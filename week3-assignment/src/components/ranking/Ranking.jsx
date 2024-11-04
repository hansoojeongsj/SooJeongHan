import React, { useEffect, useState } from 'react';
import { FaRedo } from 'react-icons/fa';
import * as R from './RankingStyle';

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const storedRankings = JSON.parse(localStorage.getItem('rankings')) || [];
    const sortedRankings = storedRankings.sort((a, b) => {
      if (a.level !== b.level) {
        return b.level.localeCompare(a.level);
      }
      return a.playTime - b.playTime; 
    });
    setRankings(sortedRankings);
  }, []);

  const handleReset = () => {
    localStorage.removeItem('rankings');
    setRankings([]);
    alert('랭킹 초기화');
  };

  return (
    <R.RankingContainer>
      <R.TitleContainer>
        <R.Title>랭킹</R.Title>
        <R.Button onClick={handleReset}>
          <FaRedo style={{ marginRight: '8px' }} /> 초기화
        </R.Button>
      </R.TitleContainer>
      <R.Table>
        <thead>
          <tr>
            <R.Th>타임스탬프</R.Th>
            <R.Th>레벨</R.Th>
            <R.Th>플레이 시간</R.Th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
            <R.TableRow key={index}>
              <R.Td>{new Date(ranking.timestamp).toLocaleString()}</R.Td>
              <R.Td>{ranking.level}</R.Td>
              <R.Td>{ranking.playTime}초</R.Td>
            </R.TableRow>
          ))}
        </tbody>
      </R.Table>
    </R.RankingContainer>
  );
};

export default Ranking;
