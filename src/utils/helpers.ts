// provides a delay for an async function.  useful for testing, generally not needed in production
export const delay = async (msDelay: number): Promise<void> => {
  return new Promise(resolve => setTimeout(() => resolve(), msDelay));
};
