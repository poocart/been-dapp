import React from 'react';

import type { Questions } from '../models/Quiz';

type Prop = {
  name: string,
  questions: Questions[],
};

type State = {
  answer?: string,
};

const Quiz = (props) => {
  const { name, questions } = props;
  return (
    <div>
      {name}<br/>
      {questions.map(({ question, answers }) => {
        return (
          <div>{question}: {answers.toString()}</div>
        )
      })}
    </div>
  )
};
export default Quiz;
