import React from 'react';
import styled from 'styled-components';
import { TopNav } from "../components/TopNav";
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
import {Storage, STORAGE_KEYS} from "../services/storage";
import HeaderBlock from "../components/HeaderBlock";

type State = {
  quizzes?: QuizModel[],
};

const Container = styled.div`
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px -5px 0;
`;

const QuizCard = styled.a`
  width: 50%;
  text-decoration: none;
`;

const InnerWrapper = styled.div`
  border: 2px solid black;
  margin: 5px;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
  color: black;
`;

const BadgeImage = styled.img`
  width: 70px;
  height: 70px;
  display: inline-block;
  border-radius: 35px;
  padding: 3px;
`;

const boxIcon = require('../assets/images/badge2.png');
const pillaristaIcon = require('../assets/images/badge3.png');

export default class Quizes extends React.Component<*, State> {
  constructor(props){
    super(props);
    this.state = {
      quizzes: []
    };
  }

  componentDidMount() {
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => {
        const filterredQuizes = quizzes.length ? quizzes.filter(({ name }) => name !== 'ethberlin') : [];
        this.setState({ quizzes: filterredQuizes })
      });
  }

  render() {
    const { quizzes } = this.state;
    return (
      <Container>
        <HeaderBlock />
        <TopNav title="Quizes" />
        <CardsWrapper>
          {quizzes.map((quiz, index) => {
            const { name } = quiz;
            const quizId = `quiz-${index}`;
            const iconName = name === 'pillar' ? pillaristaIcon : boxIcon;
             return (
              <QuizCard href={`/quizes/${name}`} key={quizId}>
                <InnerWrapper>
                  <BadgeImage src={iconName} />
                  <Title>{name}</Title>
                </InnerWrapper>
              </QuizCard>)
          })}
        </CardsWrapper>
      </Container>
    )
  }
}
