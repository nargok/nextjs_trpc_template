import { trpc } from '@/config/trpc/client';
import { User } from '@/domain/model/user';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UserListViewPage: NextPage = () => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState(Array<User>());

  const usersQuery = trpc.userList.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const goToRegister = () => {
    router.push('/users/register');
  };

  const goToShow = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {usersQuery.data.pages[0].map((user: User) => (
          <li key={user.id}>
            Name: {user.name}{' '}
            <span className='text-blue-600 hover:cursor-pointer' onClick={() => goToShow(user.id)}>
              Show
            </span>
          </li>
        ))}
      </ul>
      <button className='bg-blue-500 hover:bg-blue-400 text-white rounded px-4 py-2' onClick={goToRegister}>
        Add User
      </button>
    </div>
  );
};

export default UserListViewPage;
