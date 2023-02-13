import { inferProcedureInput } from '@trpc/server';
import { NextPage } from 'next';
import React, { useState } from 'react';
import type { AppRouter } from '@/server/index';
import { trpc } from '@/config/trpc/client';

interface UserRegisterForm {
  name: string;
}

const UserRegisterViewPage: NextPage = () => {
  const [state, setState] = useState<UserRegisterForm>({
    name: '',
  });

  const addPost = trpc.userCreate.useMutation({
    async onSuccess() {
      // callback todo call user list query
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('onSubmit', state.name);
    type Input = inferProcedureInput<AppRouter['userCreate']>;
    const input: Input = {
      name: state.name,
    };
    try {
      await addPost.mutateAsync(input);
    } catch (e) {
      console.error({ e }, 'Failed to add user');
    }
  };

  return (
    <div className='block '>
      <div className='py-2 px-4 h-screen'>
        <h1>ユーザー登録</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>
              Name
            </label>
            <input
              type='text'
              name='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='User Name'
              required
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={() => handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterViewPage;
