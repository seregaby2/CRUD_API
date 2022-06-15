import { v4 as uuidv4 } from 'uuid';
import { IPerson } from '../interface';

export const users: IPerson[] = [{ id: '1', name: 'alex', age: 50 }];

export const findAllUsers = () => new Promise((resolve) => {
  resolve(users);
});

export const findUserById = (id: string) => new Promise((resolve) => {
  const user = users.find((e) => e.id === id);
  resolve(user);
});

export const create = (user: IPerson): Promise<IPerson> => new Promise((resolve) => {
  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  resolve(newUser);
});
