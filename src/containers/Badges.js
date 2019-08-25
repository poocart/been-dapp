import React from 'react';
import styled from 'styled-components';
import type { Quiz as QuizModel } from '../models/Quiz';
import HeaderBlock from "../components/HeaderBlock";
import { TopNav } from "../components/TopNav";
import { Storage, STORAGE_KEYS } from "../services/storage";

type State = {
  quizzes?: QuizModel[],
};

const Container = styled.div`
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BadgeCard = styled.a`
  width: 50%;
  text-decoration: none;
  text-align: center;
`;

const InnerWrapper = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  color: black;
`;

const BadgeImage = styled.img`
  width: 70px;
  height: 70px;
  display: inline-block;
  border-radius: 35px;
  padding: 3px;
`;

const BadgeWrapper = styled.div`
  width: 76px;
  height: 76px;
  display: inline-block;
  border-radius: 38px;
  border: 2px solid black;
`;

const BlackButton = styled.button`
  background: #000;
  border: none;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
  align-self: center;
  width: 200px;
  &:disabled {
    background: #909090;
  }
`;

const SmallText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  width: 120px;
  display: inline-block;
`;

const Footer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const attendanceIcon = require('../assets/images/badge1.png');
const boxIcon = require('../assets/images/badge2.png');
const pillaristaIcon = require('../assets/images/badge3.png');

const badgesMockup = [{
    id: '1',
    name: 'Attendance',
    iconName: attendanceIcon,
  },
  {
    id: '2',
    name: 'Pillarista',
    iconName: pillaristaIcon,
  },
  {
    id: '3',
    name: '3 boxer',
    iconName: boxIcon,
  },
  {
    id: '4',
    name: 'Unlock',
    iconName: '',
  },
  {
    id: '5',
    name: 'Unlock',
    iconName: '',
  },
  {
    id: '6',
    name: 'Unlock',
    iconName: '',
  },
  {
    id: '7',
    name: 'Unlock',
    iconName: '',
  },
  {
    id: '8',
    name: 'Unlock',
    iconName: '',
  },
];

export default class Badges extends React.Component<*, State> {
  render() {
    const firstBadge = badgesMockup[0];
    const threeOtherBadges = badgesMockup.slice(1, 4);
    const leftBadges = badgesMockup.slice(4, 8);
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    return (
      <Container>
        <HeaderBlock />
        <TopNav title="YOUR BADGES (3/8)" />
        <BadgeCard
          style={{ marginTop: 10 }}
          href={`https://ropsten.etherscan.io/address/${publicKey}#tokentxnsErc721`}
          target="_blank"
        >
          <InnerWrapper>
            <BadgeWrapper>
              {!!firstBadge.iconName && <BadgeImage src={firstBadge.iconName} />}
            </BadgeWrapper>
            <Title>{firstBadge.name}</Title>
          </InnerWrapper>
        </BadgeCard>

        <CardsWrapper>
          {threeOtherBadges.map((quiz, index) => {
            const { name, iconName } = quiz;
            return (
              <BadgeCard
                style={{ width: '33%' }}
                href={!!iconName ? `https://ropsten.etherscan.io/address/${publicKey}#tokentxnsErc721` : null}
                target="_blank"
                key={`${index}`}
              >
                <InnerWrapper>
                  <BadgeWrapper>
                    {!!iconName && <BadgeImage src={iconName} />}
                  </BadgeWrapper>
                  <Title>{name}</Title>
                </InnerWrapper>
              </BadgeCard>)
          })}
        </CardsWrapper>

        <CardsWrapper>
          {leftBadges.map((quiz, index) => {
            const { name, iconName } = quiz;
            return (
              <BadgeCard
                style={{ width: '50%' }}
                href={!!iconName ? `https://ropsten.etherscan.io/address/${publicKey}#tokentxnsErc721` : null}
                target="_blank"
                key={`${index}`}
              >
                <InnerWrapper>
                  <BadgeWrapper>
                    {!!iconName && <BadgeImage src={iconName} />}
                  </BadgeWrapper>
                  <Title>{name}</Title>
                </InnerWrapper>
              </BadgeCard>)
          })}
        </CardsWrapper>
        <Footer>
          <BlackButton disabled>Transfer badges</BlackButton>
          <SmallText>Save badges in your main wallet</SmallText>
        </Footer>
      </Container>
    )
  }
}
