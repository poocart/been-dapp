// @flow

const apiHost = 'https://bean-there.herokuapp.com/';

export const ENDPOINTS = {
  GET_QUIZZES: 'get-quiz',
  GET_AGENDA: 'mocks/agenda.json',
  SUBMIT_QUIZ: 'check-answer',
};

const apiUrl = endpoint => `${apiHost}${endpoint}`;

class ApiServiceWrapper {
  get(endpoint: string, queryParams: Object = {}) {
    let finalEndpoint = apiUrl(endpoint);
    if (Object.keys(queryParams).length) {
      const query = Object.keys(queryParams)
        .map(key => key + '=' + queryParams[key])
        .join('&');
      finalEndpoint = `${finalEndpoint}?${query}`;
    }
    return fetch(finalEndpoint)
      .then(response => response.json())
      .then(json => json.body)
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
    return fetch(apiUrl(endpoint), config)
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
