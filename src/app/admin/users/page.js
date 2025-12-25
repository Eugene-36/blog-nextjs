import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import updateUserRole from './action';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) redirect('/login');
  const users = await prisma.user.findMany();

  return (
    <main className='container'>
      <h1>Check admin panel</h1>
      <table className='table table-hover'>
        <thead>
          <tr className='table-dark'>
            <th scope='col'>ID</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'>Make ADMIN/USER</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, email, role }) => (
            <tr key={id}>
              <td className='table-info'>{id}</td>
              <td className='table-info'>{email}</td>
              <td className='table-info'>{role}</td>
              <td className='table-info text-align-center'>
                <div className='d-flex'>
                  <form action={updateUserRole}>
                    <input type='hidden' name='id' value={id} />
                    <button type='submit' className='btn btn-primary me-2'>
                      Make admin
                    </button>
                  </form>
                  <form action={updateUserRole}>
                    <input type='hidden' name='id' value={id} />
                    <button type='submit' className='btn btn-secondary'>
                      Make user
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
