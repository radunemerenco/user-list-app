import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { deleteUser } from '../services/userService';
import { User } from '../types';
import Pagination from './Pagination';

interface UserListProps {
  users: User[];
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  currentPage,
  pageCount,
  onPageChange,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className="p-4 bg-gray-50 border rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id!)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserList;
