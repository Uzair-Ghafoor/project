import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);
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
          <div className=' flex flex-col gap-y-4'>
            <input
              type='text'
              className=' w-[420px] rounded-lg p-3'
              defaultValue={currentUser.username}
            />
            <input
              type='text'
              className=' w-[420px] rounded-lg p-3'
              defaultValue={currentUser.email}
            />
            <input
              type='text'
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
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Profile;
