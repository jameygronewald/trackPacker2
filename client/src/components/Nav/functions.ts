export const handleLogout = (): void => {
    localStorage.clear();
    console.log('logout hit');
    // setUserData({ isAuthenticated: false });
  };