import React from 'react';
import * as H from './HeaderStyle';

const Header = ({ onSelect, selectedPage, timeElapsed, setSelectedLevel }) => {
    return (
        <H.HeaderContainer>
            <H.LeftSection>
                <h1>1 to 50</h1>
                <H.Button 
                    onClick={() => {
                        onSelect('game'); 
                        setSelectedLevel('LEVEL_1'); 
                    }} 
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
            {selectedPage === 'game' && (
                <H.RightSection>
                    <H.LevelSelect onChange={(e) => setSelectedLevel(e.target.value)}>
                        <option value="LEVEL_1">Level 1</option>
                        <option value="LEVEL_2">Level 2</option>
                        <option value="LEVEL_3">Level 3</option>
                    </H.LevelSelect>
                    <H.Timer>{timeElapsed}</H.Timer>                
                </H.RightSection>
            )}
        </H.HeaderContainer>
    );
};

export default Header;
