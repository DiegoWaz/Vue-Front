export function authHeader() {
    // return authorization header with jwt token
    let loggedIn = JSON.parse(localStorage.getItem('user'));

    if (loggedIn && loggedIn.token) {
        return { 'Authorization': 'Bearer ' + loggedIn.token };
    } else {
        return {};
    }
}
