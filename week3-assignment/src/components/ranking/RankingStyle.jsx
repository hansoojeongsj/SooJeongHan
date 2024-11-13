import styled from 'styled-components';

export const RankingContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  padding: 1rem 2rem;
  border: none;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgray};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const Th = styled.th`
  padding: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  text-align: left;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const Td = styled.td`
  padding: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.skyblue};
  }
`;
