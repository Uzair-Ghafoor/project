import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/signup', form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' bg-[#f0f4f1] h-[100vh] flex justify-center'>
      <form onSubmit={handleSubmit} className=' max-w-xl flex flex-col gap-y-6'>
        <h1 className=' mt-14 mb-9 text-center text-3xl font-medium'>
          Sign Up
        </h1>
        <input
          type='text'
          id='username'
          className=' w-[420px] rounded-lg p-3'
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          className=' w-[420px] rounded-lg p-3'
          placeholder='email'
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
          Sign up
        </button>
        <div className=' flex'>
          <p className=' mr-2'>Already have an account?</p>
          <Link to={'/signin'} className=' text-blue-600'>
            Signin
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
