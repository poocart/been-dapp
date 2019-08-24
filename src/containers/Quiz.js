import React from 'react';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';

type State = {
  quizzes?: QuizModel[],
};

export default class LoggedIn extends React.Component<*, State> {
  constructor(props){
    super(props);
    this.state = {
      quizzes: []
    };
  }

  componentDidMount() {
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: '0x1' })
      .then(quizzes => this.setState({ quizzes }));
  }

  render() {
    const { quizzes } = this.state;
    return (
      <div>
        {quizzes.map(({ name, questions }, index) => {
          const quizId = `quiz-${index}`;
          return (
            <Quiz
              name={name}
              quizId={quizId}
              questions={questions}
              key={quizId}
            />
          );
        })}
      </div>
    )
  }
}