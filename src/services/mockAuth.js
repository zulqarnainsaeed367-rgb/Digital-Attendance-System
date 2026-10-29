const STORAGE_KEY = 'digital-attendance-user';
const REGISTERED_USERS_KEY = 'digital-attendance-registered-users';

export const demoUsers = [
  {
    id: 'admin-01',
    name: 'Admin User',
    email: 'admin@school.com',
    password: 'e',
    role: 'admin',
  },
  {
    id: 'teacher-01',
    name: 'Teacher User',
    email: 'teacher@school.com',
    password: 'teacher125',
    role: 'teacher',
  },
  {
    id: 'student-01',
    name: 'Student User',
    email: 'student@school.com',
    password: 'student123',
    role: 'student',
  },
];

export function getUserRolePath(role) {
  const pathMap = {
    admin: '/admin-dashboard',
    teacher: '/teacher-dashboard',
    student: '/student-dashboard',
  };

  return pathMap[role] || '/login';
}

export function getStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedUser = localStorage.getItem(STORAGE_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
}

export function saveUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export function clearUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getRegisteredUsers() {
  if (typeof window === 'undefined') {
    return [];
  }

  const savedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
  return savedUsers ? JSON.parse(savedUsers) : [];
}

export function register(name, email, password, role) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const allowedRoles = ['teacher', 'student'];

  if (!normalizedName || !normalizedEmail || !password) {
    throw new Error('Please complete all fields.');
  }

  if (!allowedRoles.includes(role)) {
    throw new Error('Please choose a valid account role.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const registeredUsers = getRegisteredUsers();
  const emailExists = [...demoUsers, ...registeredUsers].some(
    (account) => account.email.toLowerCase() === normalizedEmail,
  );

  if (emailExists) {
    throw new Error('An account with this email already exists.');
  }

  const user = {
    id: `user-${crypto.randomUUID()}`,
    name: normalizedName,
    email: normalizedEmail,
    password,
    role,
  };
  const updatedUsers = [...registeredUsers, user];

  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
  }

  const safeUser = { ...user };
  delete safeUser.password;
  saveUser(safeUser);
  return safeUser;
}

export function login(email, password, role) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = [...demoUsers, ...getRegisteredUsers()].find(
    (account) =>
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password,
  );

  if (!user) {
    throw new Error('Invalid email or password. Please use a demo account.');
  }

  if (role && user.role !== role) {
    throw new Error(`This account does not have the ${role} role.`);
  }

  const safeUser = { ...user };
  delete safeUser.password;
  saveUser(safeUser);
  return safeUser;
}

export function logout() {
  clearUser();
}

export function getDemoAccounts() {
  return demoUsers.map(({ name, email, role }) => ({ name, email, role }));
}
