import { PAGE_SIZE } from '../constants';
import { User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return (await response.json()) as User;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};

export const getUsers = async (
  page: number,
): Promise<{
  results: User[];
  previous?: { page: number; limit: number };
  next?: { page: number; limit: number };
  count: number;
}> => {
  const response = await fetch(
    `${API_BASE_URL}/users?limit=${PAGE_SIZE}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return await response.json();
};
