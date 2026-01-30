import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user.userId },
    include: { accounts: true },
  });
  if (!user) redirect('/login');
  return (
    <main className='container pt-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>Profile Data</h1>
      </div>
      {user.accounts.length > 0 && (
        <div>
          <h2>Accounts</h2>

          <ul className='list-group'>
            {user.accounts.map((account) => (
              <li key={account.id} className='list-group-item mb-2'>
                {account.provider}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>User Info</h2>
      <ul className='list-group'>
        <li className='list-group-item mb-2'>Name: {user.name}</li>
        <li className='list-group-item mb-2'>Email: {user.email}</li>
        <li className='list-group-item mb-2'>
          Permissions Version: {user.permissionsVersion}
        </li>
        <li className='list-group-item mb-2'>User Role: {user.role}</li>
      </ul>
      {user.password && (
        <div>
          <h2>Log in with Credentials</h2>
          <ul className='list-group'>
            <li className='list-group-item mb-2'>Password: enabled</li>
            <li className='list-group-item mb-2'>Email: enabled</li>
          </ul>
        </div>
      )}
    </main>
  );
}
