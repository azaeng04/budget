export const createdMe = () => ({
  createdMoi: () => 'Created me!',
  withContext: () => ({
    info: (message: string) => message,
  }),
});

export const spyOnMe = createdMe();

export const myFunc = () => {
  return spyOnMe.withContext();
};
