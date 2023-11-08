export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as {
    token: string;
  };
  console.log(user.token);
  return user.token !== null;
};
