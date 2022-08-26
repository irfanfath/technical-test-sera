export const isEmailValid = (email: string): boolean => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailFormat.test(email) ? true : false;
};
