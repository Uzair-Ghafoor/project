import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <header className=' bg-slate-200 shadow-xl'>
      <Link
        to={'/'}
        className=' max-w-6xl mx-auto flex justify-between p-3 items-center'
      >
        <h1 className=' text-lg font-bold'>
          <span className=' text-slate-500'>Uzair</span>
          <span className=' text-slate-700'>Estate</span>
        </h1>
        <div className=' flex  justify-between items-center bg-[#F1F5F9] p-3  rounded-lg'>
          <input
            type='text'
            placeholder='search...'
            className=' bg-transparent w-44 sm:w-64'
          />
          <IoSearchOutline size={25} />
        </div>
        <div className=' font-light flex items-center gap-x-4'>
          <Link className=' hidden sm:inline' to={'/'}>
            Home
          </Link>
          <Link className=' hidden sm:flex' to={'/about'}>
            About
          </Link>
          <Link to={`${currentUser ? '/profile' : '/signin'}`}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className=' w-8 h-8 rounded-full'
                alt=''
              />
            ) : (
              'Signin'
            )}
          </Link>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
