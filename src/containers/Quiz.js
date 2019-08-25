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

export default class QuizScreen extends React.Component<*, State> {
  constructor(props){
    super(props);
    this.state = {
      quiz: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const quizName = match.params.quizName;
    this.setState({ quizName });

    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => {
        const thisQuiz = quizzes.find(({ name })=> name === quizName) || {};
        this.setState({ quiz: thisQuiz })
      });
  }

  render() {
    const { quiz } = this.state;
    const { name = '', quizId ='', questions = [] } = quiz;
    return (
      <Container>
        <HeaderBlock />
          <Quiz
            name={name}
            quizId={quizId}
            questions={questions}
            key={quizId}
          />
      </Container>
    )
  }
}
