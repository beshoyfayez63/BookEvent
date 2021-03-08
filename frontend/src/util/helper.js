export const getDataLocalStorage = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('uid');
  return { token, userId };
};
