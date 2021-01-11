interface RandomResponse {
  message: string;
  status?: string;
}

const url = 'https://dog.ceo/api';

const getRandom = async (): Promise<string> => {
  return fetch(`${url}/breeds/image/random`)
    .then(async (response): Promise<RandomResponse> => response.json())
    .then((jsonResponse): string => jsonResponse.message);
};

export { getRandom };
