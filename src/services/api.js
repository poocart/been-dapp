// @flow

export const ENDPOINTS = {
  GET_QUIZZES: 'mocks/quizzes.json'
};

class ApiServiceWrapper {
  get(endpoint: string) {
    return fetch(endpoint)
      .then(response => response.json())
      .catch(this.handleError)
  }

  handleError(error) {
    return {
      title: 'Error message',
      message: 'Failed to request',
    }
  }
}

export const ApiService = new ApiServiceWrapper();
