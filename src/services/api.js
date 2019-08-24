// @flow

export const ENDPOINTS = {
  GET_QUIZZES: 'mocks/quizzes.json',
  SUBMIT_QUIZ: '/',
};

class ApiServiceWrapper {
  get(endpoint: string) {
    return fetch(endpoint)
      .then(response => response.json())
      .catch(this.handleError)
  }

  submit(endpoint: string, payload?: Object) {
    let config = {
      method: 'POST',
    };
    if (payload) {
      config = {
        ...config,
        body: JSON.stringify(payload),
      }
    }
    return fetch(endpoint, config)
      .then(response => response.json())
      .catch(this.handleError)
  }

  handleError(error) {
    console.log('error: ', error);
    return {
      title: 'Error message',
      message: 'Failed to request',
    }
  }
}

export const ApiService = new ApiServiceWrapper();
