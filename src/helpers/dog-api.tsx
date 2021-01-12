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

const getListBreed = async (): Promise<string[]> => {
  return fetch(`${url}/breeds/list/all`).then(
    async (response): Promise<string[]> => {
      const jsonResponse = await response.json();
      const mainBreeds: string[] = Object.keys(jsonResponse.message);
      const subBreeds: string[] = [];

      mainBreeds.forEach((key: string): void => {
        if (jsonResponse.message[key].length > 0) {
          jsonResponse.message[key].forEach((subBreed: string): void => {
            subBreeds.push(`${subBreed} ${key}`);
          });
        }
      });

      return [...mainBreeds, ...subBreeds];
    },
  );
};

const getByBreed = async (breed: string): Promise<string[]> => {
  const parsedBreed = breed.split(' ').reverse().join('/');

  return fetch(`${url}/breed/${parsedBreed}/images`).then(
    async (response): Promise<string[]> => {
      const jsonResponse = await response.json();

      return Object.values(jsonResponse.message);
    },
  );
};

export { getRandom, getListBreed, getByBreed };
