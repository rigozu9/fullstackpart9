export const isNotNumber = (argument: unknown): boolean => {
    return typeof argument !== 'number' && isNaN(Number(argument));
  };
  