import { register } from './action';

// export const metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <main className='container' style={{ maxWidth: 480, margin: '40px auto' }}>
      <h1 className='mb-4'>Register</h1>

      <form action={register} method='post'>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='form-control'
            placeholder='Enter email'
            required
            autoComplete='email'
          />
          <div className='form-text'>
            We’ll never share your email with anyone else.
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='form-control'
            placeholder='Password'
            required
            minLength={6}
            autoComplete='new-password'
          />
        </div>

        <button className='btn btn-primary' type='submit'>
          Create account
        </button>
      </form>

      <p className='mt-3 link-opacity-25-hover'>
        Already have an account?{' '}
        <a href='/login' className='link-opacity-25-hover'>
          Login
        </a>
      </p>
    </main>
  );
}
