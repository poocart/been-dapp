import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Storage, STORAGE_KEYS } from '../services/storage';

import myProfileIcon from '../assets/images/profile.svg';
import beansImage from '../assets/images/beens.svg';

const HeaderWrapper = styled.div`
  padding: 10px 14px;
  border: 2px solid #000000;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #000000;
`;

const MyProfileButton = styled.a`
  position: absolute;
  top: 50%;
  margin-top: -18px;
  right: 10px;
`;

const MainLink = styled.a`
  text-decoration: none;
`;

const BeansImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const HeaderBlock = withRouter(({ history }) => {
  const existingPk = Storage.get(STORAGE_KEYS.PRIVATE_KEY);
  if (!existingPk) return <p>Not logged in</p>;
  return (
    <HeaderWrapper>
     <MainLink href="/">
       <Title>
         25 <span style={{ color: '#ff00f2' }}>BEEN</span>
       </Title>
     </MainLink>
      <MyProfileButton href="/profile">
        <img src={myProfileIcon} />
      </MyProfileButton>
      <BeansImage src={beansImage} />
      { /* <button onClick={() => {
        history.push('/');
        Storage.reset();
      }}
      >
        Sign out
      </button>
      <a href="/">Quiz</a>
      <a href="/agenda">Agenda</a> */ }
    </HeaderWrapper>
  );
});
