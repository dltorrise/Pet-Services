import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // retrieve user token saved from localstorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // save user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // remove user token from local storage when logged out
    localStorage.removeItem('id_token');
    // reload page and reset state
    window.location.assign('/');
  }
}

export default new AuthService();
