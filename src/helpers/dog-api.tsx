import Breed from '../types/breed';

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

const getListBreed = async (): Promise<Breed[]> => {
  return fetch(`${url}/breeds/list/all`).then(
    async (response): Promise<Breed[]> => {
      const jsonResponse = await response.json();
      const keys = Object.keys(jsonResponse.message);

      return keys.map((key): Breed => ({ name: key }));
    },
  );
};

export { getRandom, getListBreed };
