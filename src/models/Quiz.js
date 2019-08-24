// @flow

export type Questions = {
  question: string,
  answers: string[],
}

export type Quiz = {
  name: string,
  questions: Questions[],
}
