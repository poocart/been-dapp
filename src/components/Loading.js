import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  margin-bottom: 25px;
  font-size: 26px;
  font-weight: 700;
`;


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Square = styled.div`
  display: inline-block;
  width: 60vw;
  height: 60vw;
  border: 4px solid black;
  animation: ${rotate} 3s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -30vw;
  margin-left: -30vw;
  z-index: 2;
`;


const loadingGifs = [
  'https://media.giphy.com/media/s05af72MALT9K/giphy.gif',
  'https://media.giphy.com/media/4KLv24CPUoZ0I/giphy.gif',
  'https://media.giphy.com/media/3txF7DEwHN2X6/giphy.gif',
  'https://media.giphy.com/media/9eSJ3YKbFDtS0/giphy.gif',
  'https://media.giphy.com/media/KWhmkHq7zVkOc/giphy.gif',
];

const randomLoadingGif = () => {
  const index = Math.floor(Math.random() * loadingGifs.length);
  return loadingGifs[index];
};

const Loading = () => (
  <LoadingWrapper>
    <LoadingText>Loading...</LoadingText>
    <img src={randomLoadingGif()} />
    <Square />
  </LoadingWrapper>
);

export default Loading;
