import React from 'react';
import * as H from './HeaderStyle';

const Header = ({ onSelect, selectedPage }) => {
    return (
        <H.HeaderContainer>
            <H.LeftSection>
                <h1>1 to 50</h1>
                <H.Button 
                    onClick={() => onSelect('game')} 
                    $isActive={selectedPage === 'game'}
                >
                    게임
                </H.Button>
                <H.Button 
                    onClick={() => onSelect('ranking')} 
                    $isActive={selectedPage === 'ranking'}
                >
                    랭킹
                </H.Button>
            </H.LeftSection>
            <H.RightSection>
              <H.LevelSelect>
                  <option value="level1">Level 1</option>
                  <option value="level2">Level 2</option>
                  <option value="level3">Level 3</option>
              </H.LevelSelect>
              <H.Timer>0.00</H.Timer>                
            </H.RightSection>
        </H.HeaderContainer>
    );
};

export default Header;
