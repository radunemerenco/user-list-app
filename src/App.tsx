import { useQuery } from '@tanstack/react-query';
import React from 'react';

import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import { getUsers } from './services/userService';
import { User } from './types';

const App = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <AddUserForm />
        {!!users && <UserList users={users} />}
      </div>
    </div>
  );
};

export default App;
