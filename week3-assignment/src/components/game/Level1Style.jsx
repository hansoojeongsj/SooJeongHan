import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  font-size: 2rem;
  border: 2px solid blue;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: deepskyblue;
  }
`;

export const StatusContainer = styled.div`
  margin-bottom: 20px;
`;

export const StatusText = styled.p`
  font-size: 1.5rem;
`;
