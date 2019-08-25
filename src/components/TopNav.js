import React from 'react';
import styled from 'styled-components';

const backIcon = require('../assets/images/back.png');


const TopNavWrapper = styled.div`
  flex: 1;
  flex-direction: row;
  padding: 10px 30px;
  position: relative;
  margin: 10px 0;
`;

const BackButton = styled.a`
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -15px;
`;

const BackIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const MainTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  color: black;
`;

export const TopNav = ({ title }) => {
  return (
    <TopNavWrapper>
      <BackButton href="/">
        <BackIcon src={backIcon} />
      </BackButton>
      <MainTitle>
        {title}
      </MainTitle>
    </TopNavWrapper>
  )
};
