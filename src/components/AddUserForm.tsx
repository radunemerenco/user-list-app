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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}

      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}

      <input {...register('phone', { required: true })} />
      {errors.phone && <span>Phone number is required</span>}

      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
