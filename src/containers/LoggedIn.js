import React from "react";
import { Redirect } from 'react-router-dom';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
const PK = 'pk';

type State = {
  quizzes?: QuizModel[],
};

export default class LoggedIn extends React.Component<Props, State> {
  state = {
    redirectToReferrer: false,
    quizzes: []
  };

  componentDidMount() {
    const { match } = this.props;
    const pk = match.params.pk;
    const existingPk = localStorage.getItem(PK);

    ApiService
      .get(ENDPOINTS.GET_QUIZZES)
      .then(quizzes => this.setState({ quizzes }));


    if (pk) {
      if (!existingPk) {
        localStorage.setItem(PK, pk);
        this.login();
      } else {
        this.setState({ redirectToReferrer: true })
      }
    } else if (existingPk) {
      this.login();
    }
  }

  login = () => {
    this.setState(() => ({
      redirectToReferrer: true
    }))
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, quizzes } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>Content for not logged user</p>
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
