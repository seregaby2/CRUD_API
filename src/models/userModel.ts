import { v4 as uuidv4 } from 'uuid';
import { IPerson } from '../interface';

// eslint-disable-next-line import/no-mutable-exports
export let users: IPerson[] = [];

export const findAllUsers = () => new Promise((resolve) => {
  resolve(users);
});

export const findUserById = (id: string): Promise<IPerson> => new Promise((resolve) => {
  const user = users.find((e) => e.id === id);
  if (user) {
    resolve(user);
  }
});

export const create = (user: IPerson): Promise<IPerson> => new Promise((resolve) => {
  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  resolve(newUser);
});

export const update = (id:string, user: IPerson): Promise<IPerson> => new Promise((resolve) => {
  const index = users.findIndex((e) => e.id === id);
  users[index] = { id, ...user };
  resolve(users[index]);
});

export const remove = (id: string) => new Promise((resolve) => {
  users = users.filter((e) => e.id !== id);
  resolve('user deleted');
});
