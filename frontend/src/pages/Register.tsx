import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
    } else {
      const registerData = {
        name,
        email,
        password,
      };

      dispatch(register(registerData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserPlus /> Register
        </h1>
        <p>Create your account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            {/* Name */}
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              className='form-control'
            />
          </div>

          {/* Email */}
          <div className='form-group'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={onChange}
              className='form-control'
            />
          </div>

          {/* Password */}
          <div className='form-group'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              className='form-control'
            />
          </div>

          {/* Password Confirm */}
          <div className='form-group'>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={onChange}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
