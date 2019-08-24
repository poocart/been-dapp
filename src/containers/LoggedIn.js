import React from 'react';
import QRCodeGenerator from 'qrcode';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
import { Storage, STORAGE_KEYS } from "../services/storage";

type State = {
  quizzes?: QuizModel[],
};

export default class LoggedIn extends React.Component<*, State> {
  constructor(props){
    super(props);
    const profileData = Storage.get(STORAGE_KEYS.PROFILE, {});
    this.state = {
      profile: profileData,
      quizzes: []
    };
  }

  onPayWithDataClick = async () => {
    const { profile } = this.state;
    if (!Object.keys(profile).length) return;
    const qrCode = await QRCodeGenerator.toDataURL(JSON.stringify(profile), { margin: 0 });
    this.setState({ qrCode });
  };

  onReceiveContactClick = () => {

  };

  componentDidMount() {
    ApiService
      .get(ENDPOINTS.GET_QUIZZES)
      .then(quizzes => this.setState({ quizzes }));
  }

  render() {
    const { quizzes, qrCode } = this.state;
    return (
      <div>
        {!!qrCode && <img src={qrCode} />}
        <button onClick={this.onPayWithDataClick}>Pay with your data</button>
        <button onClick={this.onReceiveContactClick}>Receive contact information</button>
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
