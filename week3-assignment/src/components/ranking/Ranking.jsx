import React from 'react';
import { FaRedo } from 'react-icons/fa';
import * as R from './RankingStyle';

const Ranking = () => {
  const rankings = [
    { timestamp: '2024-10-31 12:00', level: 'Level 1', playTime: '10:30' },
    { timestamp: '2024-10-31 13:00', level: 'Level 2', playTime: '8:45' },
    { timestamp: '2024-10-31 14:00', level: 'Level 3', playTime: '15:20' },
    { timestamp: '2024-10-31 15:00', level: 'Level 3', playTime: '15:20' },
  ];

  const handleReset = () => {
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
              <R.Td>{ranking.timestamp}</R.Td>
              <R.Td>{ranking.level}</R.Td>
              <R.Td>{ranking.playTime}</R.Td>
            </R.TableRow>
          ))}
        </tbody>
      </R.Table>
    </R.RankingContainer>
  );
};

export default Ranking;
