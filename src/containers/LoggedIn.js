import React from "react";
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
const PK = 'pk';

type State = {
  quizzes?: QuizModel[],
};

export default class LoggedIn extends React.Component<Props, State> {
  state = {
    quizzes: []
  };

  componentDidMount() {
    ApiService
      .get(ENDPOINTS.GET_QUIZZES)
      .then(quizzes => this.setState({ quizzes }));
  }

  render() {
    const { quizzes } = this.state;

    return (
      <div>
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
      </div>
    )
  }
}
