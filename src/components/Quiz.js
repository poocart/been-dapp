// @flow
import React from 'react';
import styled from 'styled-components';

import type { Questions } from '../models/Quiz';
import { ApiService, ENDPOINTS } from "../services/api";
import { Storage, STORAGE_KEYS } from '../services/storage';

const QuizBlock = styled.div`
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  border: 2px solid black;
  width: 100%;
  padding: 14px;
  text-align: center;
  background-color: black;
  color: white;
  font-size: 14px;
  margin-top: 20px;
`;

type Prop = {
  name: string,
  quizId: number,
  questions: Questions[],
};

type State = {
  answers?: {},
}

class Quiz extends React.Component<Prop, State> {
  state = {};

  onSubmitClick = () => {
    const { name } = this.props;
    const { answers } = this.state;
    if (!answers) return;
    const sequence = Object.values(answers).join('');
    const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .submit(ENDPOINTS.SUBMIT_QUIZ, {
        pubkey: publicKey,
        name,
        sequence
      });
  };

  onAnswerChange = (question, answer) => {
    const { answers: currentAnswers = {} } = this.state;
    const answers = {
      ...currentAnswers,
      [question]: answer,
    };
    this.setState({ answers });
    console.log('answers: ', answers);
  };

  render() {
    const { name, questions, quizId } = this.props;
    return (
      <div>
        <h1 style={{ marginBottom: 14, marginTop: 10 }}>{name}</h1>
        {questions.map(({question, answers}, questionIndex) => {
          const questionId = `${quizId}-question-${questionIndex}`;
          return (
            <QuizBlock key={questionId}>
              <h3 style={{ marginBottom: 8 }}>{question}</h3>
              {answers.map((answer, answerIndex) => {
                const answerId = `${questionId}-answer-${answerIndex}`;
                return (
                  <div key={answerId}>
                    <label htmlFor={answerId}>
                      <input
                        name={questionId}
                        type="radio"
                        id={answerId}
                        onChange={() => this.onAnswerChange(questionIndex, answerIndex)}
                      />
                      &nbsp;{answer}
                    </label>
                  </div>
                );
              })}
            </QuizBlock>
          );
        })}
        <SubmitButton onClick={() => this.onSubmitClick()}>Submit answers</SubmitButton>
      </div>
    )
  }
}

export default Quiz;
