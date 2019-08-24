// @flow
import React from 'react';

import type { Questions } from '../models/Quiz';
import { ApiService, ENDPOINTS } from "../services/api";
import { Storage, STORAGE_KEYS } from '../services/storage';

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
        <h1>{name}</h1>
        {questions.map(({question, answers}, questionIndex) => {
          const questionId = `${quizId}-question-${questionIndex}`;
          return (
            <div key={questionId}>
              <h3>{question}</h3>
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
            </div>
          );
        })}
        <button onClick={() => this.onSubmitClick()}>Submit answers</button>
      </div>
    )
  }
}

export default Quiz;
