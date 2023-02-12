import NextError from 'next/error';
import { trpc } from '@/config/trpc/client';
import { NextPage } from 'next';

const UserViewPage: NextPage = () => {
  const id = '1';
  const userQuery = trpc.userById.useQuery({ id });

  if (userQuery.error) {
    return <NextError title={userQuery.error.message} statusCode={userQuery.error.data?.httpStatus ?? 500} />;
  }

  if (userQuery.status !== 'success') {
    return <>Loading...</>;
  }

  console.log(userQuery);
  const { data } = userQuery;

  return (
    <>
      <h1 className='text-3xl'>User Page</h1>
      <div>User ID: {data?.id}</div>
      <div>User Name: {data?.name}</div>
    </>
  );
};

export default UserViewPage;
