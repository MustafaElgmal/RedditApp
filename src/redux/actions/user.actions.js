export const login = (user) => {
  return {
    type: "LOGIN",
    payload: {
      user,
      isLoggedIn: true,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: {
      user:{},
      isLoggedIn: false,
    },
  };
};
