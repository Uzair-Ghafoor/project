import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  signInSuccess,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  handleDeleteUser,
  signOutFailure,
  signOutStart,
} from '../../features/userSlice';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from 'firebase/storage';
import { toast } from 'react-toastify';
import { app } from '../firebase';

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [progess, setProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [file, setFile] = useState(null);
  console.log(file);
  const [form, setForm] = useState({});
  console.log(form);
  console.log(progess);

  const handleFileChange = (file) => {
    const fileSize = 2 * 1024 * 1024;
    console.log(file);
    if (file.size > fileSize) {
      setFileUploadError(true);
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setForm((prevForm) => ({ ...prevForm, avatar: downloadURL }))
        );
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const result = await axios.post(
        `/api/v1/verifiedUser/update/${currentUser._id}`,
        form
      );
      dispatch(updateUserSuccess(result?.data));
      toast.success('User updates successfully.');
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      dispatch(updateUserFailure(error.respone.data.error));
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  console.log(form);

  const handleLogout = async () => {
    dispatch(signOutStart());
    try {
      const res = await axios.post('/api/v1/user/logout');
      console.log(res);
      dispatch(signOutUserSuccess());
      toast.success(res.data.message);
    } catch (error) {
      dispatch(signOutFailure());
      toast(error.response.data.message);
    }
  };

  const handleDelete = async (req, res) => {
    try {
      const res = await axios.delete(`/api/v1/user/delete/${currentUser._id}`);
      console.log(res);
      dispatch(handleDeleteUser());
      toast.success('User deleted successfully.');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-y-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='images/*'
        />
        <img
          className=' rounded-full object-cover h-24 w-24 self-center mt-2 cursor-pointer'
          src={form?.avatar || currentUser?.avatar}
          alt='profile'
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileUploadError ? (
            <span className=' text-red-700'>
              Error Uploading image (image must be less than 2mb)
            </span>
          ) : progess > 0 && progess < 100 ? (
            <span className=' text-slate-700'>{`uploading ${progess}%`}</span>
          ) : !fileUploadError && progess === 100 ? (
            <span className=' text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser?.username}
          id='username'
          onChange={handleChange}
          className=' border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email '
          defaultValue={currentUser?.email}
          id='email'
          onChange={handleChange}
          className=' border p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className=' border p-3 rounded-lg'
        />
        <button className=' bg-gray-700 text-white uppercase p-3 rounded-lg hover:opacity-95'>
          update
        </button>
        <Link
          to='/create-listing'
          className=' w-full uppercase text-center bg-green-600 text-white hover:opacity-90 p-3 rounded-lg '
        >
          create listing
        </Link>
      </form>
      <div className=' flex justify-between mt-5'>
        <span onClick={handleDelete} className=' text-red-700 cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleLogout} className=' text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>
      {/* <p className=' text-red-700 mt-5'>{error ? error : ''}</p> */}
      <button className=' text-green-500 w-full'>Show Listings</button>
    </div>
  );
};

export default Profile;
