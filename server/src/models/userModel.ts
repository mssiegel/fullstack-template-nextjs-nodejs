export interface User {
  id: number;
  email: string;
  password: string;
}

export let users: User[] = [
  { id: 0, email: 'user1@example.com', password: 'password1' },
  { id: 1, email: 'user2@example.com', password: 'password2' },
];
