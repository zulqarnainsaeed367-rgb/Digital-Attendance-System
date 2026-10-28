const STORAGE_KEY = 'digital-attendance-user';

export const demoUsers = [
  {
    id: 'admin-01',
    name: 'Admin User',
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'teacher-01',
    name: 'Teacher User',
    email: 'teacher@school.com',
    password: 'teacher123',
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
    admin: 'zulqarnainsaeed368@gmail.com',
    teacher: 'zulqarnainsaeed367@gmail.com',
    student: 'zulqarnainsaeed366@gmail.com',
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

export function login(email, password, role) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = demoUsers.find(
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
