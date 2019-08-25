import React from 'react';
import styled from 'styled-components';

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
  </LoadingWrapper>
);

export default Loading;
