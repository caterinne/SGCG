const users = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: 'user', role: 'user' },
  { username: 'viewer', password: 'viewer', role: 'viewer' },
];

const login = (username, password) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
};

const getUserRole = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? user.role : null;
};

const logout = () => {
  sessionStorage.removeItem('user');
};

// Asignar el objeto a una variable antes de exportar
const LoginService = {
  login,
  getUserRole,
  logout,
};

export default LoginService;
