export const login = (token) => {
  return {
    type: "LOGIN",
    payload: {
      token,
      isLoggedIn: true,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: {
      token: "",
      isLoggedIn: false,
    },
  };
};
