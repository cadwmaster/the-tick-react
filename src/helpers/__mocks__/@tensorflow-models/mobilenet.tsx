const load = async (): Promise<{
  classify: () => Promise<Array<{ className: string; probability: number }>>;
}> => {
  return Promise.resolve({
    classify: async (): Promise<
      Array<{ className: string; probability: number }>
    > =>
      Promise.resolve([
        {
          className: 'classname',
          probability: 1,
        },
      ]),
  });
};

export { load };
