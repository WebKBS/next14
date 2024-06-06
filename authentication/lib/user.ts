import db from './db';

interface User {
  email: string;
  password: string;
}

export function createUser({ email, password }: User) {
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);

  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}
