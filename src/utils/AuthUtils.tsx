export const isAuthenticated = () => {
  // Check if 'window' is defined (ensuring it's executed on the client side)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user");
    return !!token; // Simplified to return a boolean directly
  }
  return false;
};
