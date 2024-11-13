import styled, { keyframes, css } from 'styled-components';

// 깜빡이는 애니메이션
export const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// 게임 컨테이너
export const GameContainer = styled.div`
  text-align: center;
`;

// 타이틀 텍스트
export const TitleNumber = styled.p`
  font-size: 2rem;
  margin: 3rem;
`;

// 그리드 스타일 - 레벨에 맞게 동적으로 변경될 수 있도록 조정
export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ gridSize }) => `repeat(${gridSize}, 100px)`};
  grid-gap: 1rem;
  margin: 2rem auto;
  justify-content: center;
`;

// 셀 스타일
export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  font-size: 2.5rem;
  cursor: pointer;
  background-color: ${({ $number, theme }) =>
    $number === null ? 'transparent' : $number > 9 ? theme.colors.blue : theme.colors.pastelblue};
  color: ${({ $number, theme }) => ($number > 9 ? theme.colors.white : theme.colors.black)};
  border-radius: 8px;
  transition: background-color 0.3s;

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      animation: ${blink} 0.5s ease forwards;
    `}
`;

