import React from 'react';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';

import type { Quiz as QuizModel } from '../models/Quiz';

type State = {
  quizzes?: QuizModel[],
}

export default class App extends React.Component {
  state = {};

  componentDidMount() {
    ApiService
      .get(ENDPOINTS.GET_QUIZZES)
      .then(quizzes => this.setState({ quizzes }))
  }

  render() {
    const { quizzes = [] } = this.state;
    return (
      <div>
        {quizzes.map(({ name, questions }) => (
          <Quiz
            name={name}
            questions={questions}
          />
        ))}
      </div>
    )
  }
}
