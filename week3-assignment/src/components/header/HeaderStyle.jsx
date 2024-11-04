import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 8rem;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  height: 8rem;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  h1 {
    margin-right: 1rem;
    font-size: 3rem;
    font-weight: bold;
  }
`;
export const Button = styled.button`
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: ${({ $isActive, theme }) => $isActive ? theme.colors.blue : theme.colors.darkblue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const LevelSelect = styled.select`
  padding: 1rem 2rem;
`;

export const Timer = styled.span`
  font-weight: bold; 
  font-size: 2.5rem;
  width: 6rem;
  display: inline-block;
  text-align: right;
`;