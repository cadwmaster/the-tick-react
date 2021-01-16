const load = async (): Promise => {
  return Promise.resolve({
    classify: async (): Promise =>
      Promise.resolve([
        {
          className: 'classname',
          probability: 1,
        },
      ]),
  });
};

export { load };
