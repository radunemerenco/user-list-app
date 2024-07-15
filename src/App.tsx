import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import { PAGE_SIZE } from './constants';
import { getUsers } from './services/userService';

const App = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
    // keepPreviousData: true,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <AddUserForm />
        {!!data && (
          <UserList
            users={data.results}
            currentPage={page}
            pageCount={Math.ceil(data.count / PAGE_SIZE)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;
