export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    token: string;
  };
  return user.token !== undefined;
};
