import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import { ApiService, ENDPOINTS } from '../services/api';
import type { Quiz as QuizModel } from '../models/Quiz';
import {Storage, STORAGE_KEYS} from "../services/storage";
import HeaderBlock from "../components/HeaderBlock";
import { TopNav } from "../components/TopNav";

const ConfirmButton = styled(Link)`
  margin-top: 35px;
  text-align: center;
  background: #0ad604;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding: 15px 0px;
  border: 2px solid #000;
  display: block;
  text-decoration: none;
  color: black;
`;

const BadgeHolder = styled.div`
  text-align: center;
  flex: 1;
  padding: 30px;
  background-color: yellow;
  margin-bottom: 20px;
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


type State = {
  quizzes?: QuizModel[],
};

const boxIcon = require('../assets/images/badge2.png');
const pillaristaIcon = require('../assets/images/badge3.png');

const Container = styled.div`
`;

export default class QuizScreen extends React.Component<*, State> {
  constructor(props){
    super(props);
    this.state = {
      quiz: {},
      showModal: false,
      checkingData: false,
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

  onSubmit = () => {
    this.setState({ showModal: true, checkingData: true })
    setTimeout(() => {
      this.setState({
        checkingData: false,
      });
    }, 3000);
  };



  render() {
    const { quiz, showModal, checkingData } = this.state;
    const { name = '', quizId ='', questions = [] } = quiz;
    const badgeSource = name === '3box' ? boxIcon : pillaristaIcon;
    return (
      <Container>
        <HeaderBlock />
        <TopNav title={name} customOnBack="/quizes" />
        <Quiz
            name={name}
            quizId={quizId}
            questions={questions}
            key={quizId}
            onSubmit={this.onSubmit}
          />
        <Modal open={showModal} onClose={() => this.setState({ showModal: false })} center>
          {!!checkingData &&
            <React.Fragment>
              <p style={{ marginBottom: 14 }}>Checking your answers...</p>
              <img style={{ width: '100%' }} src="https://media.giphy.com/media/2J76RjuuX4yaY/giphy.gif" />
            </React.Fragment>
          }
          {!checkingData &&
          <React.Fragment>
            <BadgeHolder>
              <BadgeWrapper>
                <BadgeImage src={badgeSource} />
              </BadgeWrapper>
            </BadgeHolder>
            <p>Congrats! You've just received a badge.</p>
            {name === '3box' && <p>Meet 3box team at their booth, show the badge and get yourself a t-shirt too!</p>}
            <ConfirmButton style={{ marginTop: 15 }} to="/badges">Claim it</ConfirmButton>
          </React.Fragment>}
        </Modal>
      </Container>
    )
  }
}
