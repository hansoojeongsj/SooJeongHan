import styled from 'styled-components';

// 랭킹 표를 위한 스타일
export const RankingContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80rem;
  width: 100%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: darkgray;
  color: white;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover {
    background-color: gray;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
  
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.white};;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.skyblue};
  }
`;
