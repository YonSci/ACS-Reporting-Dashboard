// Authorized users for the ACS Reporting Dashboard
// In a production environment, this should be stored securely on the server
// For now, we'll use a simple client-side approach

export const authorizedUsers = [
  {
    username: "admin@acs.com",
    password: "admin123", // In production, this should be hashed
    role: "admin",
    fullName: "Administrator"
  },
  {
    username: "editor",
    password: "editor123",
    role: "editor", 
    fullName: "Report Editor"
  },
  {
    username: "analyst",
    password: "analyst123",
    role: "analyst",
    fullName: "Data Analyst"
  }
];

// Helper function to find user by username
export const findUserByUsername = (username) => {
  return authorizedUsers.find(user => user.username === username);
};

// Helper function to validate credentials
export const validateCredentials = (username, password) => {
  const user = findUserByUsername(username);
  if (!user) {
    return { isValid: false, message: "Invalid username or password" };
  }
  
  if (user.password !== password) {
    return { isValid: false, message: "Invalid username or password" };
  }
  
  return { 
    isValid: true, 
    user: {
      username: user.username,
      role: user.role,
      fullName: user.fullName
    }
  };
}; 