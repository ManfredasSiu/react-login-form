export const getUser = () => {
    const userStr = sessionStorage.getItem('name');
    if (userStr) return userStr;
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token: string, name: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('name', name);
  }