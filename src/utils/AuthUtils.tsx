export const isAuthenticated = () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    try {
      const user = JSON.parse(userData);
      // Check for the presence of a 'token' or other authentication data
      if (user && user.token) {
        return true; // User is authenticated
      }
    } catch (error) {
      // Handle JSON parsing errors
      console.error("Error parsing user data:", error);
    }
  }

  return false; // User is not authenticated or data is missing/invalid
};




