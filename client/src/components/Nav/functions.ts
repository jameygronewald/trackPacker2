export const handleLogout = () => {
    localStorage.clear();
    console.log('logout hit');
    // setUserData({ isAuthenticated: false });
  };