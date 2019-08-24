import React from 'react';
import QRCodeGenerator from 'qrcode';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
import { Storage, STORAGE_KEYS } from "../services/storage";
import Modal from "react-responsive-modal";
import HeaderBlock from "../components/HeaderBlock";

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

  componentDidMount() {
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => this.setState({ quizzes: quizzes || [] }));
  }

  onScannerClick = () => {

  };

  render() {
    const { quizzes, qrCode } = this.state;
    return (
      <div>
        <HeaderBlock />
        <button onClick={this.onScannerClick}>SCAN</button>
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
