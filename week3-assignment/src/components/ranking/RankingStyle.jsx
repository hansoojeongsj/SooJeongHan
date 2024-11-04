import styled from 'styled-components';

export const RankingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80rem;
  width: 100%;
  margin: 5rem auto;
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
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover {
    background-color:  ${({ theme }) => theme.colors.darkgray};
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
