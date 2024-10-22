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
} from '../../features/userSlice';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from 'firebase/storage';
import { toast } from 'react-toastify';

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [progess, setProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  console.log(fileUploadError);
  const [file, setFile] = useState(null);
  console.log(file);
  const [form, setForm] = useState({});
  console.log(form);
  console.log(progess);

  const handleFileChange = (file) => {
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
        console.log(progess);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setForm({ ...formData, avatar: downloadURL })
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
      dispatch(updateUserSuccess(result.data));
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

  const handleSignout = async () => {
    try {
      const res = await axios.post('/api/v1/user/logout');
      dispatch(signOutUserSuccess());
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (req, res) => {
    try {
      const res = await axios.delete(`/api/v1/user/delete/${currentUser._id}`);
      console.log(res);
      dispatch(handleDeleteUser());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=' bg-[#f0f4f1] h-[100vh]'>
      <div className=' max-w-lg mx-auto'>
        {/* parent */}
        <div className=' flex flex-col gap-y-5 justify-center items-center'>
          {/* child */}
          <h1 className='text-3xl font-bold mt-8'>Profile</h1>
          {/* child */}
          <input type='file' ref={fileRef} hidden accept='image/*' />
          <img
            src={form.avatar || currentUser.avatar}
            onChange={(e) => setFile(e.target.files[0])}
            className=' w-28 h-28 rounded-full cursor-pointer'
            onClick={() => fileRef.current.click()}
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
          </form>
          <button className=' w-full bg-green-800 text-white  p-3 rounded-lg uppercase'>
            create listing
          </button>
          <div className=' flex justify-between'>
            <button onClick={handleDelete} className=' text-red-700'>
              Delete Account
            </button>
            <button onClick={handleSignout} className=' text-red-700'>
              Sign out
            </button>
            <button onClick={handleSignout}></button>
          </div>
          <Link to={'/listings'} className=' self-center text-green-600'>
            Show Listings
          </Link>
        </div>
      </div>
      ;
    </div>
  );
};

export default Profile;
