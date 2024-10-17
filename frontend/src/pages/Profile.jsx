import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `/api/v1/verifiedUser/update/${currentUser._id}`,
        form
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  console.log(form);
  return (
    <div className=' bg-[#f0f4f1] h-[100vh]'>
      <div className=' max-w-lg mx-auto'>
        {/* parent */}
        <div className=' flex flex-col gap-y-5 justify-center items-center'>
          {/* child */}
          <h1 className='text-3xl font-bold mt-8'>Profile</h1>
          {/* child */}
          <img
            src={currentUser.avatar}
            className=' w-28 h-28 rounded-full'
            alt=''
          />
          {/* child */}
          <form onSubmit={handleSubmit} className=' flex flex-col gap-y-4'>
            <input
              type='text'
              id='username'
              onChange={handleChange}
              className=' w-[420px] rounded-lg p-3'
              defaultValue={currentUser.username}
            />
            <input
              type='text'
              id='email'
              onChange={handleChange}
              className=' w-[420px] rounded-lg p-3'
              defaultValue={currentUser.email}
            />
            <input
              type='text'
              id='password'
              onChange={handleChange}
              className=' w-[420px] rounded-lg p-3'
              placeholder='password'
            />
            <button className=' w-full bg-gray-600 text-white  p-3 rounded-lg'>
              UPDATE
            </button>
            <button className=' w-full bg-green-800 text-white  p-3 rounded-lg uppercase'>
              create listing
            </button>
            <div className=' flex justify-between'>
              <button className=' text-red-700'>Delete Account</button>
              <button className=' text-red-700'>Sign out</button>
            </div>
            <Link to={'/listings'} className=' self-center text-green-600'>
              Show Listings
            </Link>
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default Profile;
