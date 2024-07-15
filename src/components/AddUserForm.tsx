import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { createUser } from '../services/userService';
import { User } from '../types';

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const onSubmit = (data: Omit<User, 'id'>) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="mb-2">
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
      <div className="mb-2">
        <input
          {...register('email', { required: true })}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </div>
      <div className="mb-2">
        <input
          {...register('phone', { required: true })}
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <span className="text-red-500">Phone number is required</span>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
