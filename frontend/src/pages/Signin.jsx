import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../features/userSlice';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
const Signin = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await axios.post('/api/v1/user/signin', form);
      console.log(response.data);
      console.log(response);
      dispatch(signInSuccess(response.data));
      toast.success('Logged in successfully.');
      redirect('/');
    } catch (error) {
      console.log(error.message);
      console.log(error);
      toast.error(error.response.data.error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=' bg-[#f0f4f1] h-[100vh] flex flex-col justify-center items-center'>
      <div className=' max-w-lg'>
        <form onSubmit={handleSubmit} className='  flex flex-col gap-y-6'>
          <h1 className=' mt-14 mb-9 text-center text-3xl font-medium'>
            Sign In
          </h1>
          <input
            type='email'
            id='email'
            className=' w-[420px] rounded-lg p-3'
            placeholder='Email'
            onChange={handleChange}
          />

          <input
            type='password'
            id='password'
            className=' w-[420px] rounded-lg p-3'
            placeholder='password'
            onChange={handleChange}
          />
          <button className=' w-full bg-gray-700 text-white p-3 text-lg capitalize rounded-lg'>
            Sign in
          </button>
        </form>
        <OAuth />
        <div className=' flex'>
          <p className=' mr-2'>Don't have an account?</p>
          <Link to={'/signup'} className=' text-blue-600'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
