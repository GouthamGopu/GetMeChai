import React from 'react';
import PaymentPage from '../components/PaymentPage';
import { checkUser } from '@/actions/useractions';

const Username = async ({ params }) => {

  await checkUser(params.username);

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me Chai`,
  }
}