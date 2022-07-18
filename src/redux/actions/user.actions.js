export const login = (userName) => {
  return {
    type: "LOGIN",
    payload: {
      userName,
      isLoggedIn: true,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: {
      userName: " ",
      isLoggedIn: false,
    },
  };
};
