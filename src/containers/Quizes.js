import React from 'react';
import styled from 'styled-components';
import Quiz from '../components/Quiz';
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
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
  color: black;
`;

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
      .then(quizzes => this.setState({ quizzes: quizzes || [] }));
  }

  render() {
    const { quizzes } = this.state;
    return (
      <Container>
        <HeaderBlock />
        <CardsWrapper>
          {quizzes.map((quiz, index) => {
            const { name } = quiz;
            const quizId = `quiz-${index}`;
            return (
              <QuizCard href={`/quizes/${name}`}>
                <InnerWrapper>
                  <Title>{name}</Title>
                </InnerWrapper>
              </QuizCard>)
          })}
        </CardsWrapper>
      </Container>
    )
  }
}
